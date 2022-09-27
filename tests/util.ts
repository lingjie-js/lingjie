export const pageUrlMap = {
  homePage: "http://localhost:8080/project/pages-in-lingjie/index.html",
  pageA: "http://localhost:8080/project/pages-in-lingjie/pageA.html",
  pageB: "http://localhost:8080/project/pages-in-lingjie/pageB.html",
  pageC: "http://localhost:8080/project/pages-in-lingjie/pageC.html",
  pageD: "http://localhost:8080/project/pages-in-lingjie/pageD.html",
  pageE: "http://localhost:8080/project/pages-in-lingjie/pageE.html",
  pageF: "http://localhost:8080/project/pages-in-lingjie/pageF.html",
  pageG: "http://localhost:8080/project/pages-in-lingjie/pageG.html",
  pageH: "http://localhost:8080/project/pages-in-lingjie/pageH.html",
  pageI: "http://localhost:8080/project/pages-in-lingjie/pageI.html",
  pageJ: "http://localhost:8080/project/pages-in-lingjie/pageJ.html",
  pageY: "http://localhost:8080/project/pages-in-lingjie/pageY-not-import-lingjie-page.html",
  pageZ: "http://localhost:8080/project/pages-in-lingjie/pageZ-disable-lingjie.html",
  pageNotInLingjie: "http://localhost:8080/project/pages-not-in-lingjie/index.html",
};

export const isArrayEqual = <T>(a: T[], b: T[]) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};

type WaitForIframeShowUpInput = {
  h1TagText: string
}
export const waitForIframeShowUp = (input: WaitForIframeShowUpInput) => {
  const { h1TagText } = input
  if (window) {
    const iframes = window.document.getElementsByTagName('iframe')
    const len = iframes.length
    const lastIframe = iframes[len - 1]
    const h1Tag = lastIframe.contentWindow?.document.getElementsByTagName('h1')[0]
    return h1Tag?.innerHTML === h1TagText && lastIframe.getAttribute('isActive') === 'true'
  }
  return false
}
