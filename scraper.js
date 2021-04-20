const puppeteer = require('puppeteer')

async function scrapeProduct(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const [el] = await page.$x('//*[@id="imgBlkFront"]')
    const src = await el.getProperty('src')
    const image = await src.jsonValue()

    const [el2] = await page.$x('//*[@id="productTitle"]');
    const txt = await el2.getProperty("textContent");
    const rawTxt = await txt.jsonValue()
    const title = rawTxt.replace(/\n/g, "");

    const [el3] = await page.$x(
      '//*[@id="tmmSwatches"]/ul/li[2]/span/span[3]/span[1]/span/a'
    );
    const txt2 = await el3.getProperty("textContent");
    const rawPrice = await txt2.jsonValue();
      const price = rawPrice.replace(/\n/g, "");
    

    console.log({ image, title, price });

    browser.close()
}

scrapeProduct('https://www.amazon.com/Eloquent-JavaScript-3rd-Introduction-Programming/dp/1593279507/ref=sr_1_1?dchild=1&keywords=eloquent+javascript&qid=1618908948&sr=8-1');