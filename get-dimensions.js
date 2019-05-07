const puppeteer = require('puppeteer');

(async () => {
  const browser= await puppeteer.launch({'headless':false});
  const page=await browser.newPage();
  await page.goto('https://example.com');

  const dimensions = await page.evaluate(() =>{//evaluate에서는 자바스크립트 함수 호출 가능
    alert("1");
    /*
    return{
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    }; //browser내에서 실행하는 코드
    */
  });

  console.log('Dimensions:', dimensions);

  //await browser.close();
})();
