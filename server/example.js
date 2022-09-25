const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('http://127.0.0.1:5173/', {
		waitUntil: 'networkidle0'
	});
	const scrollDimension = await page.evaluate(() => {
		return {
			width: document.scrollingElement.scrollWidth,
			height: document.scrollingElement.scrollHeight
		};
	});
	await page.setViewport({
		width: scrollDimension.width,
		height: scrollDimension.height
	});
	await page.pdf({
		path: 'example.pdf',
		printBackground: true,
		width: scrollDimension.width,
		height: scrollDimension.height
	});

	await browser.close();
})();
