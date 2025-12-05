/**************** CONFIG ****************/
const SS = SpreadsheetApp.getActiveSpreadsheet();
const SH_DROPDOWNS = 'DROPDOWNS';
const SH_DATA = 'DATA';

/**************** UI ENTRY POINT ****************/
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Expense Entry Form')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**************** DROPDOWNS ****************/
function getDropdownData() {
  var ss = SS;
  var dropdownSheet = ss.getSheetByName(SH_DROPDOWNS);
  if (!dropdownSheet) {
    throw new Error("Sheet 'DROPDOWNS' not found");
  }
  
  // EMPLOYEES: column A (A2:A)
  var employeeRange = dropdownSheet.getRange('A2:A');
  var employeeValues = employeeRange.getValues();
  var employees = employeeValues
    .map(function(row) { return row[0]; })
    .filter(function(val) { return val !== '' && val !== null; })
    .map(function(val) { return val.toString().trim(); });

  // CATEGORIES: column B (B2:B)
  var categoryRange = dropdownSheet.getRange('B2:B');
  var categoryValues = categoryRange.getValues();
  var categories = categoryValues
    .map(function(row) { return row[0]; })
    .filter(function(val) { return val !== '' && val !== null; })
    .map(function(val) { return val.toString().trim(); });
  
  return {
    employees: employees,
    categories: categories
  };
}

/**************** SUBMIT EXPENSES ****************/
function submitExpenses(data) {
  try {
    var ss = SS;
    var dataSheet = ss.getSheetByName(SH_DATA);
    if (!dataSheet) {
      throw new Error("Sheet 'DATA' not found");
    }
    
    // Clean employee name
    var employee = (data.employee || '').toString().trim();
    var transactions = data.transactions || [];
    
    var dateEntered = new Date(); // A: Date Entered
    
    var rows = [];
    for (var i = 0; i < transactions.length; i++) {
      var transaction = transactions[i];
      rows.push([
        dateEntered,                                   // A: Date Entered
        employee,                                      // B: Employee
        new Date(transaction.transactionDate),         // C: Transaction Date
        transaction.category,                          // D: Category
        parseFloat(transaction.amount),                // E: Transaction Amount
        transaction.description                        // F: Description
      ]);
    }
    
    if (rows.length > 0) {
      dataSheet.getRange(dataSheet.getLastRow() + 1, 1, rows.length, 6).setValues(rows);
    }
    
    return {
      success: true,
      message: 'Successfully submitted ' + rows.length + ' transaction(s)!'
    };
    
  } catch (error) {
    return {
      success: false,
      message: 'Error: ' + error.toString()
    };
  }
}

/**************** EMPLOYEE HISTORY ****************/
/**
 * Retrieves all transactions for a specific employee from the DATA sheet
 * @param {string} employeeName - The name of the employee to filter by
 * @return {Array} Array of transaction objects for the specified employee
 */
function getEmployeeTransactions(employeeName) {
  try {
    var ss = SS;
    var dataSheet = ss.getSheetByName(SH_DATA);
    if (!dataSheet) {
      throw new Error("Sheet 'DATA' not found");
    }
    
    var lastRow = dataSheet.getLastRow();
    if (lastRow < 2) {
      // No data rows
      return [];
    }
    
    // Read A:F from row 2 downwards
    var dataRange = dataSheet.getRange(2, 1, lastRow - 1, 6);
    var data = dataRange.getValues();
    
    // Normalize target name
    var targetName = (employeeName || '').toString().trim().toLowerCase();
    var employeeTransactions = [];
    
    for (var i = 0; i < data.length; i++) {
      var row = data[i];
      var empCell = row[1]; // Column B: Employee
      if (!empCell) continue;
      
      var rowName = empCell.toString().trim().toLowerCase();
      
      if (rowName === targetName) {
        employeeTransactions.push({
          dateEntered: row[0],       // A: Date Entered
          employee: row[1],          // B: Employee
          transactionDate: row[2],   // C: Transaction Date
          category: row[3],          // D: Category
          amount: row[4],            // E: Amount
          description: row[5]        // F: Description
        });
      }
    }
    
    return employeeTransactions;
    
  } catch (error) {
    throw new Error('Failed to retrieve transactions: ' + error.toString());
  }
}
