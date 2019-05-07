//window.scrollTo  //page.evaluate안에다가 넣기
//document.body.scrollHeight
const puppeteer = require('puppeteer');
const fs=require ('fs');

(async () => {
  const browser= await puppeteer.launch({'headless':false});
  const page=await browser.newPage();

  await page.setViewport({width:1280, height:1024});//setViewport는 화면의 크기 결정

  //Step #1. 인스타그램 접속하기
  await page.goto('https://www.instagram.com/explore/tags/%EB%A7%9B%EC%A7%91/');
  await page.waitFor(3000);

  //Step #2.현재 페이지의 인스타 갯수 가져오기
  let links = await page.$$('div._mck9w._gvoze._tn0ps'); //page.$$는 ()안에있는 모든정보 가져오기
  let listCount = links.length;
  //console.log(listCount);
  //파일에 쓰기
  let wstream = fs.createWriteStream('insta.txt');
  let idx=0;
while(true){

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

    };


  });



  wstream.write('<DOCID>'+idx+'\n');
  wstream.write('<Content>'+content.content+'\n');
  wstream.write('<Comments>'+content.comments+'\n');
  // wstream.write('<ID>'+content.id+'\n');
  // wstream.write('Content>'+content.content+'\n');
  idx+=1;
    //'x'버튼 출력하기
  await page.click('button._dcj9f');
    //2초 기다리기
  await page.waitFor(2000);

}
  //wstream.end();



  //Step #4.



})();
