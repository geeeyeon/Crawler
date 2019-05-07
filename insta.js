const puppeteer = require('puppeteer');
const fs=require ('fs');

(async () => {
  const browser= await puppeteer.launch({'headless':false});
  const page=await browser.newPage();

  await page.setViewport({width:1280, height:1024});//setViewport는 화면의 크기 결정

  //Step #1. 인스타그램 접속하기
  await page.goto('https://www.instagram.com/explore/tags/%EB%A7%9B%EC%A7%91/');
  await page.waitFor(3000);

  //파일에 쓰기
  let wstream = fs.createWriteStream('insta.txt');


  //console.log(listCount);


  var idx=0;
  var maxCount=1000;
while(idx<=maxCount){
  //Step #2.현재 페이지의 인스타 갯수 가져오기
  let links = await page.$$('div._mck9w._gvoze._tn0ps'); //page.$$는 ()안에있는 모든정보 가져오기
  let listCount = links.length;

  links[idx].click();
  await page.waitFor(2000);

  let content=await page.evaluate (function(){
    var list = document.querySelectorAll('ul._b0tqa li');

    var content=list[0].textContent;
    var comments='';

    for(var idx=1; idx<list.length; idx++){
      comments+=list[idx].textContent + '||';
    }
    return{
      content: content,
      comments: comments
      // id: id,
      // content: content.textContent;
    };
    //return content.textContent;
  });



  wstream.write('<DOCID>'+idx+'\n');
  wstream.write('<Content>'+content.content+'\n');
  wstream.write('<Comments>'+content.comments+'\n');
  // wstream.write('<ID>'+content.id+'\n');
  // wstream.write('Content>'+content.content+'\n');

    //'x'버튼 출력하기
  await page.click('button._dcj9f');
    //2초 기다리기
  await page.waitFor(2000);

  idx++;


  if(listCount - idx === 10){
    await page.evaluate(function(){
      window.scrollTo(0,document.body.scrollHeight);
      return true;
    });
  //wstream.end();
  }
  await page.waitFor(3000);
}
  wstream.end();

  //Step #3.루프 돌면서 클릭하기
  // for(let idx=0; idx < listCount; idx++){
  //   //인스타 클릭
  //   links[idx].click();
  //
  //
  //   //2초 기다리기
  //   await page.waitFor(2000);
  //   //'x'버튼 출력하기
  //   await page.click('button._dcj9f');
  //   //2초 기다리기
  //   await page.waitFor(2000);
  // }


  //Step #4.



})();
