const puppeteer = require("puppeteer");

const fs = require('fs');

(async()=>{
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:5173/', {
    waitUntil: 'networkidle0'
  });
  await page.pdf({path: 'example.pdf', format: 'a4'});

  await browser.close();


})();