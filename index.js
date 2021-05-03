require('dotenv').config();
const chalk = require('chalk');
const express = require('express');
const app = express();
const puppeteer = require('puppeteer-extra');

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const URL = 'https://www.nike.com/fr/launch/t/air-pegasus-83-blue-void';
const size = 'EU 39';

const sizeMatch = {
    'EU 38.5': 1,
    'EU 39': 2,
    'EU 39.5': 3,
    'EU 40': 4,
    'EU 40.5': 5,
    'EU 41': 6,
    'EU 42': 7,
    'EU 42.5': 8,
    'EU 43': 9,
    'EU 44': 10,
    'EU 44.5': 11,
    'EU 45': 12,
    'EU 45.5': 13,
    'EU 46': 14,
    'EU 47.5': 15,
    'EU 49.5': 16,
};

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(URL);
    
    await page.waitForSelector('#cookie-settings-layout > div > div > div > div.ncss-row.mt5-sm.mb7-sm > div:nth-child(2) > button');
    await page.click('#cookie-settings-layout > div > div > div > div.ncss-row.mt5-sm.mb7-sm > div:nth-child(2) > button');
    console.log(chalk.bold.red('Bot action: Cookies accepted'));

    await page.waitForSelector(`#root > div > div > div.main-layout > div > div.ncss-col-sm-12.full > div.pdp-container.ncss-col-sm-12.full > div > section > div.aside-container.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie.is-fixed > aside > div > div:nth-child(2) > div > div.buying-tools-container > ul > li:nth-child(${sizeMatch[size]}) > button`);
    await page.click(`#root > div > div > div.main-layout > div > div.ncss-col-sm-12.full > div.pdp-container.ncss-col-sm-12.full > div > section > div.aside-container.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie.is-fixed > aside > div > div:nth-child(2) > div > div.buying-tools-container > ul > li:nth-child(${sizeMatch[size]}) > button`);
    console.log(chalk.bold.red(`Bot action: Size ${size} selected`));

    await page.waitForSelector('button.ncss-btn-primary-dark');
    await page.click('button.ncss-btn-primary-dark');
    console.log(chalk.bold.red('Bot action: Shoes added to cart'));
    
    
    
    // await browser.close();
})();

const PORT = process.env.PORT || 3000;

console.log(chalk.bold.green('Bot being launched'));

app.get('/', (req, res) => {
    res.send('Bot being lauched');
});

app.listen(PORT, () => {
    console.log(chalk.bold.yellow(`Server listening on port ${PORT}`));
});

