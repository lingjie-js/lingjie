export type LingjieConfig = {
  disable?: boolean;
  shellSrc?: string;
};

var config = {
  disable: false,
  shellSrc: '/lingjie',
  ...((window as any).__lingjie_config__ as LingjieConfig | undefined),
};

var init = () => {
  var url = new URL(window.location.href);

  if (url.searchParams.get('lingjie') === '0') {
    window.sessionStorage.setItem('__lingjie_debug__', 'true');
    return;
  }

  if (url.searchParams.get('lingjie') === '1') {
    window.sessionStorage.setItem('__lingjie_debug__', 'false');
  }

  /**
 * disable lingjie when debugging
 */
  if (window.sessionStorage.getItem('__lingjie_debug__') === 'true') {
    return;
  }

  if (config.disable) {
    if (window.top && window.top !== window.self) {
      window.top.location.href = window.location.href
    } else {
      return;
    }
  }

  if (window.top && window.top !== window.self) {
    // current page in in an iframe
    var lingjie = (window.parent as any)?.lingjie;

    if (!lingjie) {
      throw new Error(`Lingjie Microapp not found in: ${window.location.href}`);
    }


    lingjie.initWindow(window);

    // @ts-ignore - lingjie is a IframeManager
    window.lingjie = lingjie;


  } else {
    var url = new URL(config.shellSrc, window.location.href);

    url.searchParams.set('lingjie_url', window.location.href);
    window.location.replace(url.href);
  }
};

init();
