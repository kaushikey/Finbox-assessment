Welcome

Steps to run the code:
  1. run "npm i" in terminal to install all the needed dependencies (check in same directory a "node_modules" folder will appear IF NOT then install all dependencies manually by running "npm i /Dependence name/" in terminal)
  2. Change the product name as required(refer to variable "productName").
  3. run "node index.js" or "npm start" in terminal to get te needed results. 

NOTE: "npm start" will run the program repeatedly (click on terminal -> press "ctrl + C" two times to exit)

Results:
  A folder with product name will be created in same directory which contains all the needed files.


Working of program:
    1. Create new Puppeteer Browser instance.
    2. Create new browser page variable is created to crawl the web page.
    3. Search for the Product on Amazon (program will wait until page get loads).
    4. Get all Product Links.
    5. Click on the First Product Link and wait for page loading.
    6. Extract Product Details.
    7. Create new folder if not exist and take the screenshot along with the HTML content.
    8. Store Product Data and close the browser.
