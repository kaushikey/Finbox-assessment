const puppeteer = require('puppeteer');
const fs = require('fs').promises; 
const { v4: uuidv4 } = require('uuid');

async function scrapeAmazonProduct(productName) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // Search for the product on Amazon
    const url = `https://www.amazon.com/s?k=${productName}`;
    await page.goto(url);
    console.log(url);

    // Wait for search results to load
    await page.waitForSelector('div[data-component-type="s-search-result"]');


    // Get all product links
    const productLinks = await page.$$('div[data-component-type="s-search-result"] h2 a');

    // console.log(productLinks);

    // Click on the first product link
    await productLinks[0].click();
    await page.waitForSelector('#productTitle',{timeout:60000});

    // Extract product details from the details page
    const productTitle = await page.$eval('#productTitle', element => element.textContent);
    const productUrl = page.url();
    await page.waitForSelector('.a-price .a-offscreen',{timeout:6000});
    await page.waitForFunction(() => document.querySelector('.a-icon-star-small .a-icon-alt') !== null, { timeout: 60000 });

    const productPrice = await page.$eval('.a-price .a-offscreen', element => element.textContent);
    const productRating = await page.$eval('.a-icon-star-small .a-icon-alt', element => element.textContent);
    
    // Creating a new folder
    const productFolder = `./${productName}`;
    await fs.mkdir(productFolder, { recursive: true });
    
    // Take a screenshot and HTML of the page
    const screenshotPath = `${productFolder}/${uuidv4()}.png`;
    const htmlFilePath = `${productFolder}/${uuidv4()}.html`;
    await page.screenshot({ path: screenshotPath });
    const htmlContent = await page.content();
    await fs.writeFile(htmlFilePath, htmlContent);

    // Store products specific data
    const productData = {
      title: productTitle,
      url: productUrl,
      price: productPrice,
      rating: productRating,
      screenshot: screenshotPath,
      htmlContent: htmlFilePath,
    };
    await fs.writeFile(`${productFolder}/productData.json`, JSON.stringify(productData, null, 2));

    console.log('Product data successfully scraped and stored.');

  } catch (err) {
    console.error('Error occurred while scraping:', err);
  } finally {
    await browser.close();
  }
}

const productName = 'earpones';
scrapeAmazonProduct(productName);
