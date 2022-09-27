import { test, expect } from '@playwright/test';
import { pageUrlMap, waitForIframeShowUp } from './util';

test.beforeEach(async ({ page }) => {
  const homePageUrl = "/project/pages-in-lingjie/index.html";
  await page.goto(homePageUrl)
  await page.waitForFunction(() => (window as any).lingjie !== undefined)
})

test.describe('Iframe Behavior Test', () => {

  test('goBack and goForward', async ({ page }) => {
    const { homePage, pageA, pageB } = pageUrlMap

    const homepageFrame = page.frames()[1];
    await Promise.all([
      homepageFrame.locator("#go-to-page-a").click(),
      page.waitForNavigation({ url: pageA }),
    ])
    await page.waitForFunction(() => (window as any).lingjie !== undefined)
    await page.waitForFunction(waitForIframeShowUp, { h1TagText: 'This is page A' })


    const pageAFrame = page.frames()[2];
    await Promise.all([
      pageAFrame.locator('#go-to-page-b').click(),
      page.waitForNavigation({ url: pageB }),
    ])
    await page.waitForFunction(() => (window as any).lingjie !== undefined)
    await page.waitForFunction(waitForIframeShowUp, { h1TagText: 'This is page B' })


    let len, currentFrame, flag
    await page.goBack()
    await page.waitForFunction(waitForIframeShowUp, { h1TagText: 'This is page A' })
    len = page.frames().length
    currentFrame = page.frames()[len - 1]
    flag = currentFrame.url() === page.url() && currentFrame.url() === pageA
    expect(flag).toBeTruthy()


    await page.goBack()
    await page.waitForFunction(() => (window as any).lingjie !== undefined)
    await page.waitForFunction(waitForIframeShowUp, { h1TagText: 'This is home page' })
    len = page.frames().length
    currentFrame = page.frames()[len - 1]
    flag = currentFrame.url() === page.url() && currentFrame.url() === homePage
    expect(flag).toBeTruthy()

    await page.goForward()
    await page.waitForFunction(() => (window as any).lingjie !== undefined)
    await page.waitForFunction(waitForIframeShowUp, { h1TagText: 'This is page A' })
    len = page.frames().length
    currentFrame = page.frames()[len - 1]
    flag = currentFrame.url() === page.url() && currentFrame.url() === pageA
    expect(flag).toBeTruthy()

    await page.goForward()
    await page.waitForFunction(() => (window as any).lingjie !== undefined)
    await page.waitForFunction(waitForIframeShowUp, { h1TagText: 'This is page B' })
    len = page.frames().length
    currentFrame = page.frames()[len - 1]
    flag = currentFrame.url() === page.url() && currentFrame.url() === pageB
    expect(flag).toBeTruthy()
  })

  test(`maximum number of the iframe should be 10, and lingjie could go back to any pages(iframes) even if the pages(iframes) have been dropped before`,
    async ({ page }) => {

      const lingjieShell = page.frames()[0];
      // record the name of the first iframe under lingjie-shell
      const firstIframeName = lingjieShell.childFrames()[0].name();

      const homepageFrame = page.frames()[1];
      await Promise.all([
        homepageFrame.locator("#go-to-page-a").click({ timeout: 0 }),
        page.waitForFunction(waitForIframeShowUp, { h1TagText: 'This is page A' }),
      ])

      const pageAFrame = page.frames()[2];
      await Promise.all([
        pageAFrame.locator("#go-to-page-b").click({ timeout: 0 }),
        page.waitForFunction(waitForIframeShowUp, { h1TagText: 'This is page B' }),
      ])

      const pageBFrame = page.frames()[3];
      await Promise.all([
        pageBFrame.locator("#go-to-page-c").click({ timeout: 0 }),
        page.waitForFunction(waitForIframeShowUp, { h1TagText: 'This is page C' }),
      ])

      const pageCFrame = page.frames()[4];
      await Promise.all([
        pageCFrame.locator("#go-to-page-d").click({ timeout: 0 }),
        page.waitForFunction(waitForIframeShowUp, { h1TagText: 'This is page D' }),
      ])

      const pageDFrame = page.frames()[5];
      await Promise.all([
        pageDFrame.locator("#go-to-page-e").click({ timeout: 0 }),
        page.waitForFunction(waitForIframeShowUp, { h1TagText: 'This is page E' }),
      ])

      const pageEFrame = page.frames()[6];
      await Promise.all([
        pageEFrame.locator("#go-to-page-f").click({ timeout: 0 }),
        page.waitForFunction(waitForIframeShowUp, { h1TagText: 'This is page F' }),
      ])
    
      const pageFFrame = page.frames()[7];
      await Promise.all([
        pageFFrame.locator("#go-to-page-g").click({ timeout: 0 }),
        page.waitForFunction(waitForIframeShowUp, { h1TagText: 'This is page G' }),
      ])

      const pageGFrame = page.frames()[8];
      await Promise.all([
        pageGFrame.locator("#go-to-page-h").click({ timeout: 0 }),
        page.waitForFunction(waitForIframeShowUp, { h1TagText: 'This is page H' }),
      ])

      const pageHFrame = page.frames()[9];
      await Promise.all([
        pageHFrame.locator("#go-to-page-i").click({ timeout: 0 }),
        page.waitForFunction(waitForIframeShowUp, { h1TagText: 'This is page I' }),
      ])

      const pageIFrame = page.frames()[10];
      await Promise.all([
        pageIFrame.locator("#go-to-page-j").click({ timeout: 0 }),
        page.waitForFunction(waitForIframeShowUp, { h1TagText: 'This is page J' }),
      ])

      const MAX_NUMBER_OF_IFRAME = 10;
      const numberOfIframe = lingjieShell.childFrames().length;

      expect(numberOfIframe).toBe(MAX_NUMBER_OF_IFRAME);



      // drop first iframe if exceeds limit
      const isFistFrameDropped = !lingjieShell
        .childFrames()
        .find(frame => frame.name() === firstIframeName);

      expect(isFistFrameDropped).toBeTruthy();



      // check if could go back to any pages(iframes) even if the pages(iframes) have been dropped before
      for (let i = 1; i <= 10; i++) {
        await page.goBack();
        await page.waitForFunction(() => (window as any).lingjie !== undefined)
      }

      const isDroppedFrameCameBack = lingjieShell
        .childFrames()
        .some(frame => frame.name() === firstIframeName);

      expect(isDroppedFrameCameBack).toBeTruthy();
    });

  test('history stack will not lose after page reloading ', async ({ page }) => {
    const { pageA } = pageUrlMap

    const homepageFrame = page.frames()[1];

    await Promise.all([
      homepageFrame.locator("#go-to-page-a").click(),
      page.waitForNavigation({ url: pageA }),
      page.waitForFunction(() => (window as any).lingjie !== undefined)
    ])

    let len;
    len = page.frames().length
    const frameBeforeActions = page.frames()[len - 2]
    const innerHTMLBeforeActions = await frameBeforeActions.locator('h1').innerHTML()

    await page.reload()
    await page.waitForFunction(() => (window as any).lingjie !== undefined)
    await page.goBack()
    await page.waitForFunction(() => (window as any).lingjie !== undefined)

    len = page.frames().length
    const currentFrame = page.frames()[len - 1]
    const currentInnerHtml = await currentFrame.locator('h1').innerHTML()

    const isEqual = currentInnerHtml === innerHTMLBeforeActions
    expect(isEqual).toBeTruthy()
  })


  test('by default, previous page state is preserved if goBack() ', async ({ page }) => {
    const { pageI, pageB } = pageUrlMap
    const homepageFrame = page.frames()[1];

    await Promise.all([
      homepageFrame.locator("#go-to-page-i").click(),
      page.waitForNavigation({ url: pageI }),
    ])
    await page.waitForFunction(waitForIframeShowUp, { h1TagText: 'This is page I' })
    // wait 2500ms for attaching an element
    await page.waitForFunction(() => {
      const iframes = window.document.getElementsByTagName('iframe')
      const len = iframes.length
      const lastIframe = iframes[len - 1]
      return !!lastIframe.contentWindow?.document.getElementById('back-action-test')
    })

    const pageIFrame = page.frames()[2]
    await Promise.all([
      pageIFrame.locator("#go-to-page-b").click(),
      page.waitForNavigation({ url: pageB }),
      page.waitForFunction(() => (window as any).lingjie !== undefined)
    ])

    await page.goBack()
    await page.waitForFunction(() => (window as any).lingjie !== undefined)
    await page.waitForFunction(waitForIframeShowUp, { h1TagText: 'This is page I' })

    const len = page.frames().length
    const currentFrame = page.frames()[len - 1]
    const count = await currentFrame.locator('#back-action-test').count()

    expect(count).toBe(1)
  })
})
