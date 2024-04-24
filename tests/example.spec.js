
const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');
import MailSlurp from "mailslurp-client";
//const ExcelJS = require('exceljs');
const XLSX = require('xlsx');
const fs = require('fs');
const punycode = require('punycode/');

const fs1 = require('fs').promises;

test('Write xlsb file', async ({ page }) => {
  const filePath = 'D:/Playwright_parser/testing1.xlsb';

  // Read binary Excel file
  const buffer = fs.readFileSync(filePath);
  const workbook = XLSX.read(buffer, { bookVBA: true, type: 'buffer', dense: true });

  // Assume you're writing to the first sheet (index 0)
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const rowNumber = 0;
  const colNumber = 0;
  const row = worksheet[rowNumber];

  let cell = row[colNumber] || {};
      
  cell = 'sagarTesting';

  worksheet[rowNumber][colNumber] = cell;

  // Write the modified workbook back to the file
  const updatedBuffer = XLSX.write(workbook, { bookType: 'xlsb', bookSST: true, type: 'buffer' });

  // Save the updated workbook to the same file
  fs.writeFileSync(filePath, updatedBuffer);

});





test('count xlsb file', async ({ page }) => {

  
  const filePath = 'D:/Playwright_parser/testing1.xlsb';

  // Read binary Excel file
  const buffer = fs.readFileSync(filePath);
  const workbook = XLSX.read(buffer, { bookVBA: false, type: 'buffer' });

  // Assume you're reading from the first sheet (index 0)
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  //SS1
  const range = XLSX.utils.decode_range(worksheet['!ref']);
  const numRows = range.e.r - range.s.r + 1; // Number of rows
  const numCols = range.e.c - range.s.c + 1; // Number of columns

  console.log('Number of rows:', numRows);
  console.log('Number of columns:', numCols);
     
});

test('read column names', async ({ page }) => {

  
  const filePath = 'D:/Playwright_parser/testing1.xlsb';

  // Read binary Excel file
  const buffer = fs.readFileSync(filePath);
  const workbook = XLSX.read(buffer, { bookVBA: true, type: 'buffer' });

  // Assume you're reading from the first sheet (index 0)
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const range = XLSX.utils.decode_range(worksheet['!ref']);
  const numCols = range.e.c - range.s.c + 1; // Number of columns

  const columnList = [];
  for(var i=1; i< numCols;i++){
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: i - 1 });
    const cellValue = worksheet[cellAddress] ? worksheet[cellAddress].v : undefined;

    //console.log('Cell '+cellAddress+': ', cellValue);
    columnList.push(cellValue)
  }
  // Print the array
  console.log(columnList);
});

test('read dense xlsb values', async ({ page }) => {

  
    const filePath = 'D:/Playwright_parser/testing1.xlsb';
  
    // Read binary Excel file
    const buffer = fs.readFileSync(filePath);
    const workbook = XLSX.read(buffer, { bookVBA: true, type: 'buffer', dense: true });
  
    // Assume you're reading from the first sheet (index 0)
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
  
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    const numRows = range.e.r - range.s.r + 1; // Number of rows
      // Iterate through cells in the current row
      const rowNumber = 300500
      const colNumber = 12
      for (let i = 300000; i < rowNumber; i++) {
        const row = worksheet[i];
      
        // Iterate through cells in the current row
        for (let j = 0; j < colNumber; j++) {
          const cell = row[j];
      
          // Check if the 'v' property exists before accessing it
          if (cell && cell.v !== undefined) {
            // Access the 'v' property of the cell
            const cellValue = cell.v;
      
            // Process or use the cell value as needed
            console.log(`Row ${i + 1}, Column ${j + 1}: Value - ${cellValue}`);
          } else {
            // Handle the case where 'v' property is undefined or does not exist
            console.log(`Row ${i + 1}, Column ${j + 1}: Value - undefined`);
          }
        }
      }
});

test('Read xlsx sheet', async ({ page }) => {

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('D:/Playwright_parser/userdetails.xlsx');
  const worksheet = workbook.getWorksheet('userdetails'); // Replace with your sheet name

  // Access cell values
  const cellValueA1 = worksheet.getCell('A1').value;
  // @ts-ignore
  const cellValueB2 = worksheet.getCell('B2').value;

  console.log('Cell A1:', cellValueA1);
  console.log('Cell B2:', cellValueB2);

  //await browser.close();
});

test('Write xlsx sheet', async ({ page }) => {

  
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('D:/Playwright_parser/userdetails.xlsx');
  const worksheet = workbook.getWorksheet('userdetails'); // Replace with your sheet name

  worksheet.getCell('A1').value = 'test8Writing';
  worksheet.getCell('B2').value = 'test9Writing';
  worksheet.getCell(9, 7).value = 'pgn';
  worksheet.getCell(10, 1).value = 'gln';

  await workbook.xlsx.writeFile('D:/Playwright_parser/userdetails.xlsx');


  // Access cell values
  const cellValueA1 = worksheet.getCell('A1').value;
  // @ts-ignore
  const cellValueB2 = worksheet.getCell('B2').value;
  console.log('Cell A1: after writing', cellValueA1);
  console.log('Cell B2: after writing', cellValueB2);

  //await browser.close();
});

test('read rows xlsb value', async ({ page }) => {

  
  const filePath = 'D:/Playwright_parser/testing1.xlsb';

  // Read binary Excel file
  const buffer = fs.readFileSync(filePath);
  const workbook = XLSX.read(buffer, { bookVBA: true, type: 'buffer' });

  // Assume you're reading from the first sheet (index 0)
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const range = XLSX.utils.decode_range(worksheet['!ref']);
  const numRows = range.e.r - range.s.r + 1; // Number of rows


  const rowData = [];
  const columnIndex = 2;
  for(var i=1; i< numRows;i++){
    const cellAddress = XLSX.utils.encode_cell({ r: i - 1, c: columnIndex - 1 });
    const cellValue = worksheet[cellAddress] ? worksheet[cellAddress].v : undefined;

    //console.log('Cell '+cellAddress+': ', cellValue);
    rowData.push(cellValue)
  }


  // Print the array
  console.log(rowData);
});

test.skip('write dense xlsb values', async ({ page }) => {
  page.setDefaultTimeout(60000);
  const filePath = 'D:/Playwright_parser/testing1.xlsb';

  // Read binary Excel file
  const buffer = fs.readFileSync(filePath);
  const workbook = XLSX.read(buffer, { bookVBA: true, type: 'buffer', dense: true });

  // Assume you're writing to the first sheet (index 0)
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const rowNumber = 10;
  const colNumber = 12;

  // Create a 2D array to represent new values to be written
  const newData = [];

  // Iterate through rows
  for (let i = 1; i < rowNumber; i++) {
    const rowData = [];

    // Iterate through cells in the current row
    for (let j = 0; j < colNumber; j++) {
      // Replace this line with the desired value or calculation logic
      const cellValue = `NewValue_${i}_${j}`;
      rowData.push(cellValue);
    }

    newData.push(rowData);
  }

  // Calculate the range to write to
  const startCell = { c: 0, r: 1 }; // Starting cell coordinates
  const endCell = { c: colNumber - 1, r: rowNumber - 1 }; // Ending cell coordinates
  const range = XLSX.utils.encode_range(startCell, endCell);

  // Add the new data to the worksheet
  XLSX.utils.sheet_add_aoa(worksheet, newData, { origin: -1 });

  // Write the modified workbook back to a new file or the same file
  const newBuffer = XLSX.write(workbook, { bookVBA: true, bookType: 'xlsb', type: 'buffer' });

  // Replace the original file with the new data
  fs.writeFileSync(filePath, newBuffer);

  console.log('Values have been written successfully.');
});

test('Filter String', async ({ page }) => {  
    const URL = 'sc_task_list.do?sysparm_query=assignment_group%3De81fbe2adb132410f57064904b96193f%5Eshort_descriptionSTARTSWITHNew%20Hire%20-%20PLM%2FCAD%20Software%20needed%5Eactive%3Dfalse%5Evariables.4755eaf6db603010924cff0968961976BETWEENjavascript%3Ags.beginningOfToday()%40javascript%3Ags.dateGenerate(\'2024-02-15\'%2C\'end\')&sysparm_view=';
    const result = URL.match("[0-9]{4}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{2}")[0];
    const sag = 'saggg'
    if(result === sag){
      console.log(500)
    }

    console.log('oldURL :: '+URL)
      // Get the current date
    const currentDate = new Date();

    // Add 4 days to the current date
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 4);

    // Extract year, month, and day components
    const year = futureDate.getFullYear();
    const month = String(futureDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(futureDate.getDate()).padStart(2, '0');

    // Create the desired pattern [YYYY-MM-DD] for the future date
    const formattedFutureDate = `${year}-${month}-${day}`;
    console.log();
    const newURL = URL.replace(result,formattedFutureDate)

    console.log('newURL :: '+newURL)


});

test.only('can login and verify email address with mailslurp', async() => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate to Gmail login page
  await page.goto('https://mail.google.com');

  // Log in
  await page.fill('input[type="email"]', 'sagarsunar202@gmail.com');
  await page.click("//span[text()='Next']"); // Click "Next"
  await page.fill('input[type="password"]', 'sagarsunar');
  await page.click("//span[text()='Next']"); // Click "Next"

  // Compose and send an email
  await page.click('div[aria-label="Compose"]');
  await page.fill('textarea[name="to"]', 'recipient@example.com');
  await page.fill('input[name="subjectbox"]', 'Subject of the email');
  await page.fill('div[aria-label="Message Body"]', 'Body of the email');
  await page.click('div[aria-label="Send (Ctrl-Enter)"]');

  // Wait for the email to be sent (you may need to adjust the selector)
  await page.waitForSelector('span[aria-label="Message sent."]');

  // Close the browser
  await browser.close();

});





