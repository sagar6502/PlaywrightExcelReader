
const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');
const ExcelJS = require('exceljs');
const XLSX = require('xlsx');
const fs = require('fs');

const fs1 = require('fs').promises;

test.skip('Write xlsb file', async ({ page }) => {
  // Specify the path to the existing XLSB file
  const filePath = 'D:/Playwright_parser/AutoFilter.xlsb';

   try {
    // Read binary Excel file
    const buffer = await fs1.readFile(filePath);

    // Read the existing workbook with VBA support
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);

    // Print names of all worksheets in the workbook
    workbook.eachSheet((worksheet, sheetId) => {
      console.log("Sheet");
      console.log(`Sheet ${sheetId}: ${worksheet.name}`);
    });

    // Assume you're reading from the first sheet (index 1)
    const worksheet = workbook.getWorksheet(1);

    // Check if the worksheet is loaded
    if (!worksheet) {
      throw new Error('Worksheet not found.');
    }

    // Specify row and column indices (1-based)
    const rowIndex = 2;
    const colIndex = 3;

    // Accessing a cell
    const cell = worksheet.getCell(rowIndex, colIndex);
    
    if (!cell) {
      throw new Error(`Cell at row ${rowIndex}, column ${colIndex} not found.`);
    }

    cell.value = 'TestingUpdate';

    // Save the updated workbook to a new file
    const updatedFilePath = 'D:/Playwright_parser/AutoFilter_updated.xlsb';
    await workbook.xlsx.writeFile(updatedFilePath);

    // Replace the original file with the updated one
    await fs1.rename(updatedFilePath, filePath);

    console.log(`Cell at row ${rowIndex}, column ${colIndex} updated.`);
    console.log('Cell ' + cell.address + ': ', cell.text);
  } catch (error) {
    console.error('Error:', error);
  }
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



