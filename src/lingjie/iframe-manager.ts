import {
  traceHistory,
  HistoryState,
  createHistoryState,
  HistoryTracerId,
  genHistoryTracerId,
} from './history-tracer';
import { onDocumentTitleChange } from './onDocumentTitleChange';
import { Progress } from 'rsup-progress';
import { testUrl } from './testUrl';

const progress = new Progress({
  height: '2px',
  color: '#3870e1',
  duration: 5000,
  timing: 'ease-in-out',
});

let progressTimer: any;
const startProgress = () => {
  endProgress()
  progress.start();
  clearTimeout(progressTimer);
  progressTimer = setTimeout(endProgress, 5000);
};

const endProgress = () => {
  progress.end(true);
};

export type IframeHandler = {
  isActive: (iframe: HTMLIFrameElement) => boolean;
  initialize: (iframe: HTMLIFrameElement, currentIframeCount: number) => void;
  destroy: (iframe: HTMLIFrameElement) => void;
  activate: (iframe: HTMLIFrameElement, delta: number) => void;
  inactivate: (iframe: HTMLIFrameElement, delta: number) => void;
};

export type IframeObjectRule = {
  test: RegExp | ((url: string) => boolean);
  waitFor?: string;
  timeout?: number;
  backAction?: string;
  originList?: string[];
  disabled?: boolean
};

export type IframeRule = RegExp | ((url: string) => boolean) | IframeObjectRule;

export type IframeManagerOptions = {
  rules: IframeRule[];
} & IframeHandler;

const defaultIframeHandler: IframeHandler = {
  isActive: (iframe) => {
    return iframe.getAttribute('isActive') === 'true'
  },
  initialize: (iframe) => {
    iframe.style.zIndex = '-1'
    iframe.setAttribute('isActive', 'false')
  },
  activate: (iframe) => {
    iframe.style.zIndex = '0'
    iframe.setAttribute('isActive', 'true')
  },
  inactivate: (iframe) => {
    iframe.style.zIndex = '-1'
    iframe.setAttribute('isActive', 'false')
  },
  destroy: (iframe) => {
    iframe.remove();
  },
};

export const sliderIframeHandler: IframeHandler = {
  isActive: (iframe) => {
    return iframe.getAttribute('isActive') === 'true'
  },
  initialize: (iframe, currentIframeCount) => {
    iframe.style.boxShadow = '';
    iframe.style.willChange = 'transform';
    iframe.style.transition = `transform 300ms ease-in-out`;

    if (currentIframeCount === 0) {
      iframe.style.transform = 'translateX(0)';
    } else {
      iframe.style.transform = 'translateX(100%)';
    }
    iframe.setAttribute('isActive', 'false')
  },
  activate: (iframe) => {
    iframe.style.boxShadow = 'rgba(0, 0, 0, 0.13) -4px 0px 5px 0px';
    iframe.style.transform = 'translateX(0)';
    iframe.setAttribute('isActive', 'true')
  },
  inactivate: (iframe) => {
    iframe.style.boxShadow = '';
    iframe.setAttribute('isActive', 'false')
  },
  destroy: (iframe) => {
    iframe.style.boxShadow = 'rgba(0, 0, 0, 0.13) -4px 0px 5px 0px';
    iframe.style.transform = 'translateX(100%)';
    setTimeout(() => {
      iframe.remove();
    }, 400);
  },
};

export type IframeManager = ReturnType<typeof createIframeManager>;

const PublicEvents = {
  show: 'lingjie:show',
  hide: 'lingjie:hide',
  back: 'lingjie:back',
};

const InternalEvents = {
  removeIframe: 'lingjie:remove-iframe',
} as const;

const PublicAttrs = {
  enable: 'data-lingjie-enable',
  disable: 'data-lingjie-disable',
  backAction: 'data-lingjie-back-action',
  waitFor: 'data-lingjie-wait-for',
  timeout: 'data-lingjie-timeout',
} as const;

export type LingjieData = {
  attrs: Record<string, string>;
};

export type IframeHistoryState = HistoryState<LingjieData>;

export const createIframeManager = (options: Partial<IframeManagerOptions>) => {
  const config: IframeManagerOptions = {
    rules: [() => false],
    ...defaultIframeHandler,
    ...options,
  };

  const mainHistoryTracer = traceHistory<LingjieData>(window, {
    storageKey: `__microapp_main_frame_history__`,
    data: { attrs: {} },
    onPushState: (_newState, _oldState, droppedStateList) => {
      startProgress();

      for (const droppedState of droppedStateList) {
        removeIframe(
          getIframe(droppedState.__microapp_traced_state__.historyTracerId)
        );
      }
    },
    onReplaceState: (newState, oldState) => {
      if (
        isHashChange(
          newState.__microapp_traced_state__.url,
          oldState.__microapp_traced_state__.url
        )
      ) {
        return;
      }

      const iframeList = getIframeList();

      if (iframeList.length > 0) {
        startProgress();
      }

      showIframe(newState);
    },
    onPopState: (newState, oldState, delta) => {
      if (
        isHashChange(
          newState.__microapp_traced_state__.url,
          oldState.__microapp_traced_state__.url
        )
      ) {
        return;
      }
      startProgress();
      showIframe(newState, delta);
    },
    shouldSave: () => {
      return true;
    },
  });

  const removeIframeAfterCurrentIndex = () => {
    const historyStateList = mainHistoryTracer.getHistoryStateList();

    const currentIndex = mainHistoryTracer.getCurrentIndex();

    const listForRemoving = historyStateList.slice(
      currentIndex + 1,
      historyStateList.length
    );

    for (const state of listForRemoving) {
      removeIframe(getIframe(state.__microapp_traced_state__.historyTracerId));
    }
  };

  const getIframeContainer = (): HTMLBodyElement => {
    return document.body as unknown as HTMLBodyElement;
  };

  const getIframeList = (): HTMLIFrameElement[] => {
    const iframeContainer = getIframeContainer();
    const iframeList = iframeContainer.querySelectorAll('iframe');

    return Array.from(iframeList);
  };

  const getIframeByContentWindow = (contentWindow: Window) => {
    const iframe = getIframeList().find((iframe) => {
      return iframe.contentWindow === contentWindow;
    });

    if (!iframe) {
      throw new Error(`iframe not found: ${contentWindow}`);
    }

    return iframe;
  };

  const limitIframeCount = (count: number) => {
    const iframeList = getIframeList();

    while (iframeList.length > count) {
      iframeList.shift()?.remove();
    }
  };

  const initIframeWindow = (iframe: HTMLIFrameElement, delta = 0) => {
    const isBlankPage = () => {
      if (iframe.contentWindow?.location.href) {
        return iframe.contentWindow?.location.href === 'about:blank';
      }
      return true;
    };
    doUntil({
      condition: () => {
        return !isBlankPage();
      },
      action: () => {
        if (iframe.contentWindow) {
          initWindow(iframe.contentWindow, delta);
        }
      },
      timeoutAction: () => {
        if (iframe.contentWindow) {
          if (isBlankPage()) {
            iframe.contentWindow.location.replace(iframe.src);
          } else {
            initWindow(iframe.contentWindow, delta);
          }
        }
      },
    });
  };

  const addIframe = (
    inputUrl: string,
    historyTracerId: HistoryTracerId,
    attrs?: Record<string, string>
  ) => {
    const iframe = createIframe(inputUrl, historyTracerId);
    const iframeContainer = getIframeContainer();
    const result = testUrl(inputUrl, config.rules);

    if (result.ok) {
      attrs = {
        [PublicAttrs.backAction]: result.rule?.backAction ?? '',
        [PublicAttrs.timeout]: result.rule?.timeout?.toString() ?? '',
        [PublicAttrs.waitFor]: result.rule?.waitFor ?? '',
        ...attrs,
      }
    }

    for (const key in attrs) {
      iframe.setAttribute(key, attrs[key]);
    }

    config.initialize(iframe, getIframeList().length);

    if (getIframeList().length === 0) {
      config.activate(iframe, 0);
    }

    iframeContainer.appendChild(iframe);

    initIframeWindow(iframe);
    limitIframeCount(10);
  };

  const getIframe = (id: HistoryTracerId) => {
    return document.getElementById(id) as HTMLIFrameElement | null;
  };

  const showIframe = (historyState: IframeHistoryState, delta = 0) => {
    const targetIframe = getIframe(
      historyState.__microapp_traced_state__.historyTracerId
    );

    if (targetIframe) {
      if (targetIframe.contentWindow) {
        const currentActiveIframe = findActiveIframe();

        if (targetIframe === currentActiveIframe) {
          return;
        }

        if (currentActiveIframe && delta < 0) {
          const backAction = currentActiveIframe.getAttribute(
            PublicAttrs.backAction
          );

          if (backAction === 'reload') {
            targetIframe.contentWindow.location.reload();
            initIframeWindow(targetIframe, delta);
            return;
          }
        }
        activateIframe(targetIframe, delta);
      } else {
        initIframeWindow(targetIframe, delta);
      }
    } else {
      const currentTracedState = historyState.__microapp_traced_state__;

      addIframe(
        currentTracedState.url,
        currentTracedState.historyTracerId,
        historyState.__microapp_traced_state__.data.attrs
      )
    }
  };

  const removeIframe = (iframe?: HTMLIFrameElement | null) => {
    iframe?.dispatchEvent(new CustomEvent(InternalEvents.removeIframe));
  };

  const findActiveIframe = () => {
    for (const iframe of getIframeList()) {
      if (config.isActive(iframe)) {
        return iframe;
      }
    }
  };

  const activateIframe = (targetIframe: HTMLIFrameElement, delta = 0) => {
    const currentActiveIframe = findActiveIframe();

    config.activate(targetIframe, delta);

    if (currentActiveIframe) {
      if (currentActiveIframe !== targetIframe) {
        config.inactivate(currentActiveIframe, delta);
        currentActiveIframe.contentWindow?.dispatchEvent(
          new Event(PublicEvents.hide)
        );
      }

      targetIframe.contentWindow?.dispatchEvent(new Event(PublicEvents.show));

      if (delta < 0) {
        targetIframe.contentWindow?.dispatchEvent(new Event(PublicEvents.back));
      }
    }

    endProgress();

    if (delta < 0) {
      removeIframeAfterCurrentIndex();
    }
  };

  const syncDocumentTitle = (iframeWindow: Window) => {
    onDocumentTitleChange(iframeWindow, (title) => {
      window.document.title = title;
    });
  };

  const delegateAnchorClick = (iframeWindow: Window) => {
    const getStatus = (target?: HTMLAnchorElement) => {
      if (!target) {
        return {
          type: 'non-exist' as const,
        };
      }

      const href = target.getAttribute('href');

      if (!href) {
        return {
          type: 'non-href' as const,
        };
      }

      if (href.startsWith('#')) {
        return {
          type: 'hash-link' as const,
          target,
        };
      }

      if (isHashChange(iframeWindow.location.href, target.href)) {
        return {
          type: 'hash-change' as const,
          target,
        };
      }

      if (iframeWindow.location.href === target.href) {
        return {
          type: 'same-link' as const,
          target,
        };
      }

      if (target.getAttribute('target') === '_blank') {
        return {
          type: 'open-new-tab' as const,
          target,
        };
      }

      const testResult = testUrl(target.href, config.rules);

      if (!testResult.ok) {
        return {
          type: 'unmatched-link' as const,
          target,
        };
      }

      return {
        type: 'matched-link' as const,
        target,
        backAction: testResult.rule?.backAction,
        waitFor: testResult.rule?.waitFor,
        timeout: testResult.rule?.timeout?.toString(),
      };
    };

    /**
     * The closest data-lingjie-enable/data-lingjie-disable attribute determines whether is enabled or disabled.
     */
    const isEnableLingjie = (element: HTMLElement) => {
      let target = element as HTMLElement | null;

      while (target) {
        if (target.hasAttribute(PublicAttrs.enable)) {
          return true;
        }

        if (target.hasAttribute(PublicAttrs.disable)) {
          return false;
        }

        target = target.parentElement;
      }

      return true;
    };

    const handleClick = (event: MouseEvent) => {
      if (!event.target) {
        return;
      }

      const target = event.target as HTMLElement;
      const anchor = getClosestAnchor(target);
      const status = getStatus(anchor);

      if (!isEnableLingjie(target)) {
        window.location.href = status.target?.href || ''
      }

      if (status.type === 'same-link') {
        iframeWindow.location.reload();
      } else if (status.type === 'unmatched-link') {
        window.location.href = status.target.getAttribute('href') || ''
      } else if (status.type === 'matched-link') {
        const target = status.target;
        const isDownload = target.hasAttribute('download')

        if (isDownload) {
          return
        }

        const microappAttrs = extractPublicAttrsBottomUp(target);

        event.preventDefault();
        addPage(target.href, {
          [PublicAttrs.backAction]: status.backAction ?? '',
          [PublicAttrs.timeout]: status.timeout ?? '',
          [PublicAttrs.waitFor]: status.waitFor ?? '',
          ...microappAttrs,
        });
      }
    };

    iframeWindow.document.addEventListener('click', handleClick);
  };

  let willUnload = false;

  window.addEventListener('beforeunload', () => {
    willUnload = true;
  });

  const initWindow = (iframeWindow: Window, delta = 0) => {
    const iframe = getIframeByContentWindow(iframeWindow);

    // @ts-ignore
    if (iframeWindow.lingjie) {
      if (delta < 0) {
        removeIframeAfterCurrentIndex();
      }
      return;
    }

    // @ts-ignore
    iframeWindow.lingjie = lingjie;

    const attrs = extractPublicAttrs(iframe);

    const isActive = () => {
      const currentState = mainHistoryTracer.getCurrentState();
      return (
        currentState.__microapp_traced_state__.historyTracerId === iframe.id
      );
    };

    const historyTracer = traceHistory<LingjieData>(iframeWindow, {
      historyTracerId: iframe.id as HistoryTracerId,
      data: { attrs },
      onPushState: (newState) => {
        if (!isActive()) {
          return;
        }
        window.history.replaceState(newState, '', iframeWindow.location.href);
      },
      onReplaceState: (newState) => {
        if (!isActive()) {
          return;
        }
        window.history.replaceState(newState, '', iframeWindow.location.href);
      },
      onPopState: (newState) => {
        if (!isActive()) {
          return;
        }
        window.history.replaceState(newState, '', iframeWindow.location.href);
      },
      shouldClear: () => {
        return willUnload;
      },
      shouldSave: () => {
        return !willUnload;
      },
    });

    const timeout = parseInt(
      iframe.getAttribute(PublicAttrs.timeout) ?? '5000',
      10
    );

    const getWaitFor = () => {
      const waitFor = iframe.getAttribute(PublicAttrs.waitFor);

      if (!waitFor) {
        const result = testUrl(iframeWindow.location.href, config.rules);

        if (result.ok) {
          return result.rule?.waitFor ?? 'dom-ready';
        }
      }

      return waitFor ?? 'dom-ready';
    };

    const waitFor = getWaitFor();

    const showPageWhenActive = (delta: number) => {
      if (!isActive()) {
        return;
      }

      const currentState = mainHistoryTracer.getCurrentState();

      if (window.location.href !== iframeWindow.location.href) {
        mainHistoryTracer.originalReplaceState(
          currentState,
          '',
          iframeWindow.location.href
        );
      }

      activateIframe(iframe, delta);
    };

    let status = [] as IframeStatus[];

    const show = (delta = 0) => {
      doUntil({
        initialize: (callback) => {
          getWindowStatus(iframeWindow, timeout, waitFor, (currentStatus) => {
            status = currentStatus;
            return callback();
          });
        },
        condition: () => {
          if (status.includes('matched')) {
            return true;
          }

          if (status.includes('timeout')) {
            return true;
          }

          if (waitFor === 'fcp') {
            return status.includes('fcp');
          }

          if (waitFor === 'dom-ready') {
            return status.includes('dom-ready');
          }

          if (waitFor === 'loaded') {
            return status.includes('loaded');
          }

          if (waitFor) {
            return !!iframeWindow.document.querySelector(waitFor);
          }

          return false;
        },
        action: () => {
          showPageWhenActive(delta);
        },
        timeoutAction: () => {
          showPageWhenActive(delta);
        },
      });
    };

    iframeWindow.document.addEventListener('DOMContentLoaded', () => {
      syncDocumentTitle(iframeWindow);
    });

    iframe.addEventListener(InternalEvents.removeIframe, () => {
      historyTracer.clearStorage();
      config.destroy(iframe);
    });

    show(delta);
    delegateAnchorClick(iframeWindow);
    syncDocumentTitle(iframeWindow);
  };

  const addPage = (url: string, attrs?: Record<string, string>) => {
    const result = testUrl(url, config.rules);

    if (!result.ok) {
      window.location.href = url;
      return
    }

    url = new URL(url, window.location.href).href

    const newState = createHistoryState<LingjieData>(
      url,
      null,
      genHistoryTracerId(),
      '',
      'default',
      {
        attrs: attrs ?? {},
      }
    );

    window.history.pushState(newState, '', url);

    addIframe(url, newState.__microapp_traced_state__.historyTracerId, attrs);
  };

  const replacePage = (url: string, attrs?: Record<string, string>) => {
    url = new URL(url, window.location.href).href

    const newState = createHistoryState<LingjieData>(
      url,
      null,
      genHistoryTracerId(),
      '',
      'default',
      {
        attrs: attrs ?? {},
      }
    );

    window.history.replaceState(newState, '', url);
  };

  const lingjie = {
    replacePage,
    addPage,
    redirect: (url: string) => {
      window.location.replace(url);
    },
    goto: (url: string) => {
      window.location.href = url;
    },
    initWindow,
    historyTracer: mainHistoryTracer,
  };

  return lingjie;
};

const isHashChange = (url0: string, url1: string) => {
  const {
    origin: origin0,
    pathname: pathname0,
    hash: hash0,
  } = new URL(url0, window.location.href);
  const {
    origin: origin1,
    pathname: pathname1,
    hash: hash1,
  } = new URL(url1, window.location.href);

  return origin0 === origin1 && pathname0 === pathname1 && hash0 !== hash1;
};

const createIframe = (src: string, id: string) => {
  const iframe = document.createElement('iframe');
  iframe.src = src;
  iframe.id = id;
  iframe.style.border = 'none';
  iframe.style.position = 'fixed';
  iframe.style.top = '0px';
  iframe.style.left = '0px';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.background = '#ffffff';
  return iframe;
};

const extractPublicAttrs = (
  element: HTMLElement,
  attrs: Record<string, string> = {}
) => {
  const attrNames = Object.values(PublicAttrs);

  for (const attrName of attrNames) {
    if (attrName in attrs) {
      continue;
    }
    if (element.hasAttribute(attrName)) {
      attrs[attrName] = element.getAttribute(attrName) ?? '';
    }
  }

  return attrs;
};

const extractPublicAttrsBottomUp = (
  element: HTMLElement
): Record<string, string> => {
  const attrs: Record<string, string> = {};

  let current = element as HTMLElement | null;

  while (current) {
    extractPublicAttrs(current, attrs);
    current = current.parentElement;
  }

  return attrs;
};

const getClosestAnchor = (element: HTMLElement) => {
  let current = element as HTMLElement | null;
  while (current) {
    if (isAnchorElement(current)) {
      return current;
    }
    current = current.parentElement;
  }
};

const isAnchorElement = (element: Element): element is HTMLAnchorElement => {
  return element.tagName === 'A';
};

export type IframeStatus =
  | 'timeout'
  | 'fcp'
  | 'dom-ready'
  | 'loaded'
  | 'matched';

const getWindowStatus = (
  window: Window,
  timeout = 5000,
  waitFor: string,
  callback: (status: IframeStatus[]) => boolean
) => {
  const status: IframeStatus[] = [];

  type ClearUp = {
    name: string;
    clear: () => void;
  };

  const cleanupList = [] as ClearUp[];

  const cleanup = () => {
    for (const cleanup of cleanupList) {
      cleanup.clear();
    }
  };

  const performTask = () => {
    if (callback(status)) {
      cleanup();
      return true;
    }
    return false;
  };

  if (window.document.readyState === 'interactive') {
    status.push('dom-ready');
    if (performTask()) {
      return;
    }
  } else if (window.document.readyState === 'complete') {
    status.push('dom-ready', 'loaded');
    if (performTask()) {
      return;
    }
  }

  if ((window as any).PerformanceObserver) {
    const Observer = (window as any)
      .PerformanceObserver as typeof PerformanceObserver;
    const observer = new Observer((entryList) => {
      const list = entryList.getEntriesByName('first-contentful-paint');
      if (list.length > 0) {
        status.push('fcp');
        performTask();
      }
    });

    try {
      observer.observe({ type: 'paint', buffered: true });

      cleanupList.push({
        name: 'fcp',
        clear: () => {
          observer.disconnect();
        },
      });
    } catch (e) {
      // ignore
    }
  }

  const handleDomReady = () => {
    if (!status.includes('dom-ready')) {
      status.push('dom-ready');
      performTask();
    }
  };

  window.document.addEventListener('DOMContentLoaded', handleDomReady, {
    once: true,
  });

  cleanupList.push({
    name: 'dom-ready',
    clear: () => {
      window.document.removeEventListener('DOMContentLoaded', handleDomReady);
    },
  });

  const handleLoaded = () => {
    if (!status.includes('loaded')) {
      status.push('loaded');
      performTask();
    }
  };

  window.addEventListener('load', handleLoaded, {
    once: true,
  });

  cleanupList.push({
    name: 'loaded',
    clear: () => {
      window.removeEventListener('load', handleLoaded);
    },
  });

  if (
    waitFor !== 'loaded' &&
    waitFor !== 'dom-ready' &&
    waitFor !== 'fcp' &&
    waitFor !== 'timeout'
  ) {
    const MutationObserver = (window as any)
      .MutationObserver as typeof globalThis.MutationObserver;

    if (MutationObserver) {
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === 'childList') {
            const target = window.document.querySelector(waitFor);
            if (target) {
              status.push('matched');
              performTask();
              observer?.disconnect();
              return;
            }
          }
        }
      });

      observer.observe(window.document, {
        childList: true,
        subtree: true,
      });

      cleanupList.push({
        name: 'matched',
        clear: () => {
          observer.disconnect();
        },
      });
    }
  }

  let timer = setTimeout(
    () => {
      status.push('timeout');
      performTask();
    },
    isNaN(timeout) ? 5000 : timeout
  );

  cleanupList.push({
    name: 'timeout',
    clear: () => {
      clearTimeout(timer);
    },
  });

  return status;
};

type TaskOptions = {
  initialize?: (callback: () => boolean) => unknown;
  condition: () => boolean;
  action: () => unknown;
  timeoutAction?: () => unknown;
  interval?: number;
  timeout?: number;
};

const doUntil = (options: TaskOptions) => {
  const {
    initialize,
    condition,
    action,
    interval = 200,
    timeout = 5000,
    timeoutAction,
  } = options;

  let done = false;
  let canceled = false;

  const task = () => {
    if (done || canceled) {
      return true;
    }
    clearTimeout(timer);
    if (condition()) {
      done = true;
      clearTimeout(timeoutTimer);
      action();
      return true;
    } else {
      timer = setTimeout(task, interval);
      return false;
    }
  };
  const timeoutTimer = setTimeout(() => {
    canceled = true;
    timeoutAction?.();
    clearTimeout(timer);
  }, timeout);

  let timer = setTimeout(task, interval);

  initialize?.(task);
};
