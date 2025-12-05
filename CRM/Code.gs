
// GetUi to add this in to Google sheet Menu

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Register Complain")
    .addItem("Entry Form", "showForm")
    //.addItem("Open It", "openGitHubProfile") **You can add more menu by using .addItem in this section**
    .addToUi();
}

function showForm() {
  const html = HtmlService.createHtmlOutputFromFile("BookingForm")  // replace the name BookingForm with your html file
    .setWidth(1500)
    .setHeight(650);
  SpreadsheetApp.getUi().showModalDialog(html, "Booking Form");
}

function submitForm(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data_Base");
  const lastRow = sheet.getLastRow();
  const dataRange = sheet.getRange(1, 1, lastRow, sheet.getLastColumn()).getValues();

  let emptyRowIndex = -1;

  for (let i = 0; i < dataRange.length; i++) {
    if (dataRange[i].every(cell => cell === "")) {
      emptyRowIndex = i + 1;
      break;
    }
  }

  if (emptyRowIndex === -1) {
    emptyRowIndex = lastRow + 1;
  }

  sheet.getRange(emptyRowIndex, 1, 1, 25).setValues([[
    new Date(),
    data.name,
    data.mobile,
    data.altMobile,
    data.pincode,
    data.city,
    data.landmark,
    data.callType,
    data.state,
    data.address,
    data.dealerName,
    data.dealerPhone,
    data.distributorName,
    data.distributorNo,
    data.modelNo,
    data.appliance,
    data.category,
    data.capacity,
    data.sellerChannel,
    data.unit,
    data.invoiceDate,
    data.serialNo,
    data.remarks,
    data.serviceCategory,
    data.totalCharges
  ]]);
}


