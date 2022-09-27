import { test, expect } from '@playwright/test';
import { pageUrlMap, waitForIframeShowUp } from './util';

test.beforeEach(async ({ page }) => {
  const homePageUrl = "/project/pages-in-lingjie/index.html";
  await page.goto(homePageUrl)
  await page.waitForFunction(() => (window as any).lingjie !== undefined)
})

test.describe('Lingjie HTML Attribute Test', () => {
  test('data-lingjie-wait-for-css-selector', async ({ page }) => {
    const { pageH } = pageUrlMap
    const homepageFrame = page.frames()[1];
    await Promise.all([
      homepageFrame.locator("#go-to-page-h").click(),
      page.waitForNavigation({ url: pageH }),
    ])
    await page.waitForFunction(waitForIframeShowUp, { h1TagText: 'This is page H' })

    const len = page.frames().length
    const count = await page.frames()[len - 1].locator('#wait-for-test').count()
    const isElementAttached = count === 1
    expect(isElementAttached).toBeTruthy()
  })


  test('data-lingjie-timeout', async ({ page }) => {
    const { pageG } = pageUrlMap
    const homepageFrame = page.frames()[1];
    await Promise.all([
      homepageFrame.locator("#go-to-page-g").click(),
      page.waitForNavigation({ url: pageG }),
    ])
    await page.waitForFunction(waitForIframeShowUp, { h1TagText: 'This is page G' })

    const len = page.frames().length
    // Count should be 0 because the mounting time is 2500ms and the max waiting time is 2000ms.
    const count = await page.frames()[len - 1].locator('#timeout-test').count()
    const isPageShowUpBeforeElementMount = count === 0
    expect(isPageShowUpBeforeElementMount).toBeTruthy()
  })


  test('data-lingjie-back-action-reload', async ({ page }) => {
    const { pageI, pageA } = pageUrlMap
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
      if (lastIframe) {
        return !!lastIframe.contentWindow?.document.getElementById('back-action-test')
      }
      return false
    })

    const pageIFrame = page.frames()[2]
    await Promise.all([
      pageIFrame.locator("#go-to-page-a").click(),
      page.waitForNavigation({ url: pageA }),
      page.waitForFunction(() => (window as any).lingjie !== undefined)
    ])
    await page.goBack()
    await page.waitForFunction(() => (window as any).lingjie !== undefined)
    await page.waitForFunction(waitForIframeShowUp, { h1TagText: 'This is page I' })

    const len = page.frames().length
    const currentFrame = page.frames()[len - 1]
    const count = await currentFrame.locator('#back-action-test').count()

    expect(count).toBe(0)
  })


  test('data-lingjie-enable', async ({ page }) => {
    const { pageY } = pageUrlMap
    const homepageFrame = page.frames()[1];
    await Promise.all([
      homepageFrame.locator("#go-to-page-y").click(),
      page.waitForNavigation({ url: pageY }),
    ])
    await page.waitForFunction(waitForIframeShowUp, { h1TagText: 'This is page Y' })

    const lingjieShell = page.frames()[0]
    const isPageYUnderShell = lingjieShell.childFrames().some(frame => frame.url() === pageY)
    expect(isPageYUnderShell).toBeTruthy()
  })


  test('data-lingjie-disable', async ({ page }) => {
    const { pageJ } = pageUrlMap
    const homepageFrame = page.frames()[1];
    await Promise.all([
      homepageFrame.locator("#go-to-page-j").click(),
      page.waitForNavigation({ url: pageJ }),
    ])

    await page.waitForFunction(() => (window as any).lingjie !== undefined)
    await page.waitForFunction(waitForIframeShowUp, { h1TagText: 'This is page J' })

    const lingjieShell = page.frames()[0];
    const length = lingjieShell.childFrames().length;
    const isPageJExist = lingjieShell
      .childFrames()
      .some(frame => frame.url() === pageJ);
    const onlyPageJExist = length === 1 && isPageJExist;

    expect(onlyPageJExist).toBeTruthy();
  })
})