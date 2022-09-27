import { test, expect } from '@playwright/test';
import { pageUrlMap, isArrayEqual, waitForIframeShowUp } from './util';


test.beforeEach(async ({ page }) => {
  const homePageUrl = "/project/pages-in-lingjie/index.html";
  await page.goto(homePageUrl)
  await page.waitForFunction(() => (window as any).lingjie !== undefined)
});

test.describe('Lingjie JS API Test', () => {

  test.describe('addPage() ', () => {
    test('pages registered in lingjie', async ({ page }) => {
      const { homePage, pageB } = pageUrlMap;
      await Promise.all([
        page.waitForNavigation({ url: pageB }),
        page.evaluate(
          async (pageB) => {
            if ((window as any).lingjie) {
              (window as any).lingjie.addPage(pageB);
            }
          }, pageB)
      ])
      await page.waitForFunction(() => (window as any).lingjie !== undefined)
      await page.waitForFunction(waitForIframeShowUp, { h1TagText: 'This is page B' })

      const lingjieShell = page.frames()[0];
      const currentIframes = lingjieShell
        .childFrames()
        .map(frame => frame.url());

      const expectedIframes = [homePage, pageB];
      const allPagesFound = isArrayEqual(expectedIframes, currentIframes);

      expect(allPagesFound).toBeTruthy();
    })

    test('pages NOT registered in lingjie', async ({ page }) => {
      const { pageNotInLingjie } = pageUrlMap
      await Promise.all([
        page.waitForNavigation({ url: pageNotInLingjie }),
        page.evaluate(pageNotInLingjie => {
          if ((window as any).lingjie) {
            (window as any).lingjie.addPage(pageNotInLingjie);
          }
        }, pageNotInLingjie)
      ])
      await page.waitForLoadState('load')

      const innerHTML = await page.locator('h1').first().innerHTML()
      const isCorrectPage = innerHTML === 'This page is not connected with lingjie'
      expect(isCorrectPage).toBeTruthy()
    })
  })



  test.describe('redirect() ', () => {
    test("pages registered in lingjie ", async ({ page }) => {
      const { pageC } = pageUrlMap
  
      await Promise.all([
        page.waitForNavigation({ url: pageC }),
        page.evaluate(pageC => {
          if ((window as any).lingjie) {
            (window as any).lingjie.redirect(pageC);
          }
        }, pageC)
      ])
      await page.waitForFunction(() => (window as any).lingjie !== undefined)
      await page.waitForFunction(waitForIframeShowUp, { h1TagText: 'This is page C' })

      const lingjieShell = page.frames()[0];
      const length = lingjieShell.childFrames().length;
      const isPageCExist = lingjieShell
        .childFrames()
        .some(frame => frame.url() === pageC);

      const onlyPageCExist = length === 1 && isPageCExist;
      expect(onlyPageCExist).toBeTruthy();
    });

    test("pages NOT registered in lingjie ", async ({ page }) => {
      const { pageNotInLingjie } = pageUrlMap;
      await Promise.all([
        page.waitForNavigation({ url: pageNotInLingjie }),
        page.evaluate(pageNotInLingjie => {
          if ((window as any).lingjie) {
            (window as any).lingjie.redirect(pageNotInLingjie);
          }
        }, pageNotInLingjie)
      ])
      await page.waitForLoadState('load')

      const innerHTML = await page.locator('h1').first().innerHTML()
      const isCorrectPage = innerHTML === 'This page is not connected with lingjie'
      expect(isCorrectPage).toBeTruthy()
    });
  })



  test.describe('goto() ', () => {
    test("pages registered in lingjie ", async ({ page }) => {
      const { pageD } = pageUrlMap
      await Promise.all([
        page.waitForNavigation({ url: pageD }),
        page.evaluate(pageD => {
          if ((window as any).lingjie) {
            (window as any).lingjie.goto(pageD);
          }
        }, pageD)
      ])
      await page.waitForFunction(waitForIframeShowUp, { h1TagText: 'This is page D' })
      await page.waitForFunction(() => (window as any).lingjie !== undefined)

      const lingjieShell = page.frames()[0];
      const length = lingjieShell.childFrames().length;
      const isPageDExist = lingjieShell
        .childFrames()
        .some(frame => frame.url() === pageD);
      const onlyPageDExist = length === 1 && isPageDExist;

      expect(onlyPageDExist).toBeTruthy();
    });


    test("pages NOT registered in lingjie ", async ({ page }) => {
      const { pageNotInLingjie } = pageUrlMap;
      await Promise.all([
        page.waitForNavigation({ url: pageNotInLingjie }),
        page.evaluate(pageNotInLingjie => {
          if ((window as any).lingjie) {
            (window as any).lingjie.goto(pageNotInLingjie);
          }
        }, pageNotInLingjie)
      ])
      await page.waitForLoadState('load')

      const innerHTML = await page.locator('h1').first().innerHTML()
      const isCorrectPage = innerHTML === 'This page is not connected with lingjie'
      expect(isCorrectPage).toBeTruthy()
    });
  })
})