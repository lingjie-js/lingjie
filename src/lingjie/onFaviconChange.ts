export const onFaviconChange = (window: Window, callback: (faviconLink: string) => unknown) => {
  const target = window.document.querySelector("head > link[rel='icon']") as HTMLLinkElement | undefined
  const Observer = ((window as any).MutationObserver ||
    (window as any).WebKitMutationObserver) as typeof MutationObserver

  if (target && Observer) {
    const observer = new Observer(() => {
      callback(target.href || '')
    })

    observer.observe(target, {
      subtree: true,
      characterData: true,
      childList: true,
    })
  }

  callback(target?.href || '')
}

