const puppeteer = require('puppeteer')

async function scrapeProduct(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const [el] = await page.$x('//*[@id="imgBlkFront"]')
    const src = await el.getProperty('src')
    const srcTxt = await src.jsonValue()

    const [el2] = await page.$x('//*[@id="productTitle"]');
    const txt = await el2.getProperty("textContent");
    const rawTxt = await txt.jsonValue()
    const finalTxt = rawTxt.replace(/\n/g, "");

    console.log({ srcTxt, finalTxt });

    browser.close()
}

scrapeProduct('https://www.amazon.com/Eloquent-JavaScript-3rd-Introduction-Programming/dp/1593279507/ref=sr_1_1?dchild=1&keywords=eloquent+javascript&qid=1618908948&sr=8-1');