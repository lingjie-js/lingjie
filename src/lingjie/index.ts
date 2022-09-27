import {
  createIframeManager,
  IframeManagerOptions,
  IframeRule,
  sliderIframeHandler
} from './iframe-manager';

export * from './history-tracer';
export * from './iframe-manager';

export type LingjieShellConfig = {
  paramKey?: string;
  rules?: IframeRule[];
  turnoffSlideAnimation?: boolean;
}

export type LingjieOptions = Partial<IframeManagerOptions> & LingjieShellConfig

export const initLingjie = (options?: LingjieOptions) => {
  if ((window as any).lingjie) {
    throw new Error('Lingjie is already initialized');
  }

  let { rules, ...restConfig } = (window as any).__lingjie_shell_config__ as LingjieShellConfig

  rules = (rules || []).map(function (item: any) {
    item.test = new RegExp(item.test);
    return item;
  })

  const config = {
    paramKey: 'lingjie_url',
    useGlobalVar: true,
    rules,
    ...restConfig,
    ...options,
  };
  const url = new URL(window.location.href);

  const targetUrl = url.searchParams.get(config.paramKey);

  if (!targetUrl) {
    throw new Error(`${config.paramKey} is required in query string`);
  }

  // fake url to target microapp page
  history.replaceState(null, '', targetUrl);

  let iframeManagerOptions: Partial<IframeManagerOptions> = {
    ...config
  }

  if (window.innerWidth < 800 && !config.turnoffSlideAnimation) {
    Object.assign(iframeManagerOptions, sliderIframeHandler)
  }

  // main frame
  const lingjie = createIframeManager(iframeManagerOptions);

  // @ts-ignore
  window.lingjie = lingjie;

  lingjie.replacePage(targetUrl);

  return lingjie;
};
