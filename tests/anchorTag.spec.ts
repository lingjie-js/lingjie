import { test, expect } from '@playwright/test';
import { pageUrlMap } from './util';

test.beforeEach(async ({ page }) => {
  const homePageUrl = "/project/pages-in-lingjie/index.html";
  await page.goto(homePageUrl)
  await page.waitForFunction(() => (window as any).lingjie !== undefined)
})

test.describe('Anchor Tag Redirection Test', () => {

  test('redirect to page registered in lingjie shell', async ({ page }) => {
    const { pageA } = pageUrlMap
    const homepageFrame = page.frames()[1];
    await Promise.all([
      homepageFrame.locator("#go-to-page-a").click(),
      page.waitForNavigation({ url: pageA }),
      page.waitForFunction(() => (window as any).lingjie !== undefined)
    ])

    const len = page.frames().length
    const currentFrame = page.frames()[len - 1]
    const innerHTML = await currentFrame.locator('h1').innerHTML()
    const isPageA = innerHTML === 'This is page A'

    const lingjieShell = page.frames()[0];
    const currentFrameName = currentFrame.name();
    const isUnderLingjieShell = lingjieShell
      .childFrames()
      .find(frame => frame.name() === currentFrameName);

    expect(isPageA && isUnderLingjieShell).toBeTruthy()
  })

  test('redirect to page registered in lingjie shell but disabled lingjie in config', async ({ page }) => {
    const { pageZ } = pageUrlMap
    const homepageFrame = page.frames()[1];

    await Promise.all([
      homepageFrame.locator("#go-to-page-z").click(),
      page.waitForNavigation({ url: pageZ })
    ])
    await page.waitForLoadState('load')

    const innerHTML = await page.locator('h1').first().innerHTML()
    const isPageZ = innerHTML === 'This is page Z'
    expect(isPageZ).toBeTruthy()
  })

  test('redirect to page not registered in lingjie shell', async ({ page }) => {
    const { pageNotInLingjie } = pageUrlMap
    const homepageFrame = page.frames()[1];
    await Promise.all([
      homepageFrame.locator("#go-to-page-not-in-lingjie").click(),
      page.waitForNavigation({ url: pageNotInLingjie }),
    ])
    await page.waitForLoadState('load')

    const innerHTML = await page.locator('h1').first().innerHTML()
    const isCorrectPage = innerHTML === 'This page is not connected with lingjie'
    expect(isCorrectPage).toBeTruthy()
  })
})