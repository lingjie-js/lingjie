/**
 * The idea is to trace the state of the history stack.
 *
 * Assign every history record a unique state with historyTracerId and tracedStateId while pathname/search changed or hash changed.
 *
 * Calculate the difference between the current state and the previous state when popstate event is fired
 *
 * Get the delta index which indicate the action of history like push, pop, forward, back, go(n)..
 *
 */

import { uuidv4 } from './uuidv4';
import { onDocumentTitleChange } from './onDocumentTitleChange';

export type HistoryTracerId = string & {
  tag: 'HistoryTracerId';
};

export type TracedStateId = string & {
  tag: 'TracedStateId';
};

export const genHistoryTracerId = (): HistoryTracerId => {
  return uuidv4() as HistoryTracerId;
};

export const genTracedStateId = (): TracedStateId => {
  return uuidv4() as TracedStateId;
};

export type TracedState<T = unknown> = {
  historyTracerId: HistoryTracerId;
  id: TracedStateId;
  url: string;
  title: string;
  action: 'push' | 'replace' | 'default';
  data: T;
};

export type HistoryState<T = unknown> = {
  // a special id to avoid mess us with user-defined id
  __microapp_traced_state__: TracedState<T>;
  [key: string]: unknown;
};

export type HistoryStorageState = {
  historyStateList: HistoryState<any>[];
};

export const createHistoryState = <T>(
  url: string,
  state: any,
  historyTracerId: HistoryTracerId,
  title: string,
  action: TracedState<T>['action'],
  data: T
): HistoryState<T> => {
  const tracedState: TracedState<T> = {
    historyTracerId,
    id: genTracedStateId(),
    url: new URL(url, window.location.href).href,
    title,
    action,
    data,
  };
  return {
    __microapp_traced_state__: tracedState,
    ...state,
  };
};

export type HistoryTracerOptions<T> = {
  historyTracerId?: HistoryTracerId;
  storageKey?: string;
  data: T;
  onPushState?: (
    newState: HistoryState<T>,
    currState: HistoryState<T> | null,
    droppedStateList: HistoryState<T>[]
  ) => unknown;
  onReplaceState?: (
    newState: HistoryState<T>,
    oldState: HistoryState<T>
  ) => unknown;
  onPopState?: (
    newState: HistoryState<T>,
    oldState: HistoryState<T>,
    delta: number
  ) => unknown;
  onLastBack?: (state: HistoryState<T>) => unknown;
  onLastForward?: (state: HistoryState<T>) => unknown;

  onBeforeClear?: () => unknown;
  onBeforeSave?: () => unknown;
  shouldClear?: () => boolean;
  shouldSave?: () => boolean;
};

export const getStorageKey = (historyTracerId: string) =>
  `__history_tracer_${historyTracerId}`;

export type HistoryTracer = ReturnType<typeof traceHistory>;

export const traceHistory = <T>(
  window: Window,
  options: HistoryTracerOptions<T>
) => {
  const historyTracerId = options?.historyTracerId ?? genHistoryTracerId();
  const storageKey = options?.storageKey ?? getStorageKey(historyTracerId);
  const history = window.history;

  const originalPushState = history.pushState.bind(history);
  const originalReplaceState = history.replaceState.bind(history);
  const originalBack = history.back.bind(history);
  const originalForward = history.forward.bind(history);
  const originalGo = history.go.bind(history);

  const createState = (
    inputUrl: string,
    state: any,
    action: TracedState<T>['action']
  ) => {
    const url = new URL(inputUrl, window.location.href).href;

    return createHistoryState(
      url,
      state,
      historyTracerId,
      document.title,
      action,
      options.data
    );
  };

  const getHistoryStorageValue = () => {
    const storageValue = window.sessionStorage.getItem(storageKey);
    if (storageValue) {
      try {
        return JSON.parse(storageValue) as HistoryStorageState;
      } catch (e) {
        // ignore
      }
    }
  };

  const historyStorageValue = getHistoryStorageValue();

  let currentHistoryState: HistoryState<T> = createState(
    window.location.href,
    window.history.state,
    'default'
  );

  history.replaceState(currentHistoryState, '');

  const getInitialHistoryStateList = () => {
    const list = historyStorageValue?.historyStateList ?? [];

    if (list.length > 0) {
      return list;
    }

    return [currentHistoryState];
  };

  let historyStateList = getInitialHistoryStateList();

  const saveToStorage = (value: HistoryStorageState) => {
    window.sessionStorage.setItem(storageKey, JSON.stringify(value));
  };

  const clearStorage = () => {
    window.sessionStorage?.removeItem(storageKey);
  };

  const handlePushState = (newState: HistoryState<T>) => {
    const previousHistoryState = currentHistoryState;
    const index = getCurrentIndex();

    currentHistoryState = newState;

    const droppedStateList = historyStateList.slice(index + 1);

    historyStateList = historyStateList.slice(0, index + 1);

    historyStateList.push(newState);

    if (historyStateList.length > 50) {
      droppedStateList.push(historyStateList.shift() as HistoryState<T>);
    }

    options?.onPushState?.(
      currentHistoryState,
      previousHistoryState,
      droppedStateList
    );
  };

  const handleReplaceState = (newState: HistoryState<T>) => {
    const previousHistoryState = currentHistoryState;
    const index = getCurrentIndex();
    currentHistoryState = newState;
    historyStateList[index] = newState;
    options?.onReplaceState?.(currentHistoryState, previousHistoryState);
  };

  const pushState = (
    inputState: any,
    title: string,
    url: string = window.location.href
  ) => {
    const state = createState(url, inputState, 'push');
    try {
      return originalPushState(state, title, url);
    } finally {
      handlePushState(state);
    }
  };

  const replaceState = (
    inputState: any,
    title: string,
    url: string = window.location.href
  ) => {
    const state = createState(url, inputState, 'replace');
    try {
      return originalReplaceState(state, title, url);
    } finally {
      handleReplaceState(state);
    }
  };

  const back = () => {
    const currentIndex = getCurrentIndex();

    if (currentIndex === 0) {
      options?.onLastBack?.(currentHistoryState);
    }
    return originalBack.call(history);
  };

  const forward = () => {
    const currentIndex = getCurrentIndex();

    if (currentIndex === historyStateList.length - 1) {
      options?.onLastForward?.(currentHistoryState);
    }
    return originalForward.call(history);
  };

  const go = (delta: number) => {
    const currentIndex = getCurrentIndex();

    if (currentIndex + delta < 0) {
      options?.onLastBack?.(currentHistoryState);
    } else if (currentIndex + delta > historyStateList.length - 1) {
      options?.onLastForward?.(currentHistoryState);
    }
    return originalGo(delta);
  };

  const getCurrentIndex = () => {
    return getStateIndex(currentHistoryState);
  };

  const getHistoryStateDelta = (
    fromState: HistoryState<T>,
    toState: HistoryState<T>
  ) => {
    const fromIndex = getStateIndex(fromState);
    const toIndex = getStateIndex(toState);

    return toIndex - fromIndex;
  };

  const getStateIndex = (state: HistoryState<T>) => {
    return historyStateList.findIndex((historyState) => {
      return (
        historyState.__microapp_traced_state__.id ===
        state.__microapp_traced_state__.id
      );
    });
  };

  try {
    history.pushState = pushState;
    history.replaceState = replaceState;
    history.back = back;
    history.forward = forward;
    history.go = go;
  } catch (error) {
    console.log(error)
  }


  window.addEventListener('popstate', (event: PopStateEvent) => {
    if (!event.state) {
      return;
    }

    const state = event.state as HistoryState<T>;
    const currentTracedState = currentHistoryState.__microapp_traced_state__;
    const targetTracedState = state.__microapp_traced_state__;

    if (targetTracedState.id === currentTracedState.id) {
      return;
    }

    const delta = getHistoryStateDelta(currentHistoryState, state);
    const previousHistoryState = currentHistoryState;

    currentHistoryState = state;
    options?.onPopState?.(state, previousHistoryState, delta);
  });

  window.addEventListener('hashchange', () => {
    /**
     * We don't need to trace hashchange event with history.state
     * The popstate event handler will be triggered to handle it
     * We just attach a state to the new history record via the hashchange event
     */
    if (!history.state) {
      const url = window.location.href;
      const state = createState(url, history.state, 'push');
      try {
        return originalReplaceState(state, '');
      } finally {
        handlePushState(state);
      }
    }
  });

  window.addEventListener('beforeunload', () => {
    if (options.shouldClear?.()) {
      options.onBeforeClear?.();
      clearStorage();
    }

    if (options.shouldSave?.()) {
      options.onBeforeSave?.();
      saveToStorage({
        historyStateList,
      });
    }
  });

  onDocumentTitleChange(window, (title) => {
    currentHistoryState.__microapp_traced_state__.title = title;
  });

  return {
    originalGo,
    originalReplaceState,
    historyTracerId,
    getStateIndex,
    getCurrentIndex,
    getCurrentState: () => currentHistoryState,
    clearStorage,
    getHistoryStateList: () => historyStateList,
  };
};
