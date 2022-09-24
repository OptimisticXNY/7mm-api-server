const Common = new require("./Common");
const puppeteer = require("puppeteer");
const Aria2 = require("aria2c");

const aria2 = new Aria2({
  token: "junjinking",
  url: "http://www.wander555.ml:6800/jsonrpc",
});

class ChromeServer extends Common {
  async testData(data) {
    console.log(data);

    return data.url;
  }

  async getSe7enData(data) {
    //需要保存的数据
    let targeUrl = data.url;
    try {
      //创建一个Browser浏览器实例，并设置相关参数
      const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args: [
          "--start-maximized",
          "--blink-settings=imagesEnabled=false",
          "--no-sandbox",
        ],
        ignoreDefaultArgs: ["--enable-automation"],
      });

      //创建一个Page实例
      const page = await browser.newPage();
      await page.goto(targeUrl, {
        waitUntil: "networkidle2",
      });

      //执行streamsb的函数，点击标签
      await page.evaluate((x) => jfun_show_streamsb());

      //获取具体的a标签的地址
      const urlInfo = await page.$eval(
        "#mvspan_2 > div.video-row > span > a",
        (el) => el.href
      );

      //跳转到下载页面
      await page.goto(urlInfo, {
        waitUntil: "networkidle2",
      });

      //点击download，进入下载页面
      // const searchBtn2 = await page.$('#mvspan_2 > div.video-row > span > a');
      // await searchBtn2.click();

      await page.waitForTimeout(2000);

      //获取红字的url地址
      const urlInfo2 = await page.$eval("#hddzzdg252", (el) => el.href);
      await page.waitForTimeout(200);
      await page.goto(urlInfo2, {
        waitUntil: "networkidle2",
      });

      await page.waitForTimeout(3000);

      //点击下载
      const searchBtn4 = await page.$("#content > div > ul > li:nth-child(3)");
      await searchBtn4.click();

      await page.waitForTimeout(3000);

      //TODO
      //默认点第一个下载，
      const searchBtn5 = await page.$(
        "#container > div > table > tbody > tr:nth-child(2) > td:nth-child(1) > a"
      );
      await searchBtn5.click();

      await page.waitForTimeout(2000);
      //点击下载
      const searchBtn6 = await page.$("#F1 > button");
      await searchBtn6.click();

      await page.waitForTimeout(8000);

      //获取最后的下载地址
      const urlInfo3 = await page.$eval(
        "#container > div > span > a",
        (el) => el.href
      );
      //关闭浏览器
      await browser.close();

      return urlInfo3;
    } catch (error) {
      return "error";
    }
  }

  async sendToAria2(url) {
    const res = await aria2.addUri(url);
    return res;
  }
}

module.exports = ChromeServer;
