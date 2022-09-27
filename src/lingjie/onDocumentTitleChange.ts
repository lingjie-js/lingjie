export const onDocumentTitleChange = (window: Window, callback: (title: string) => unknown) => {
  const target = window.document.querySelector('title')
  const Observer = ((window as any).MutationObserver ||
    (window as any).WebKitMutationObserver) as typeof MutationObserver

  if (target && Observer) {
    const observer = new Observer(() => {
      callback(window.document.title)
    })

    observer.observe(target, {
      subtree: true,
      characterData: true,
      childList: true,
    })
  }

  callback(window.document.title)
}
