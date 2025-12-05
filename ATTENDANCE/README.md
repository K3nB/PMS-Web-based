# Web-based Production Management System (Google Sheets + Apps Script)
### 🔗 Web Page link : [Click Here](https://script.google.com/macros/s/AKfycbw5GK78tpVSaG7ezQgf1LZ2cJtmWIP2nnq61QF6rbFYQDxwctiTruZPSy4P3GoJrSgopQ/exec)
A lightweight **Production Management System (PMS)** built using **Google Sheets as the database** and **Apps Script + HTML/CSS/JS** as the frontend.

This web app lets you manage:

- Product master  
- Machine master  
- Production log entries  

All data is stored in structured sheets and managed via a simple, modern web UI.

---

## 🔧 Tech Stack

- **Google Apps Script** (`Code.gs`)
- **HTML / CSS / JavaScript** (`index.html`)
- **Google Sheets** (backend database)

---

## 📁 Google Sheets Structure

Create a Google Spreadsheet with the following sheets:

### 1. `MASTER_PRODUCT`

Used for product master data.

| Column Name    | Type    | Description                      |
| -------------- | ------- | -------------------------------- |
| `ID`           | Number  | Auto-generated unique ID         |
| `ProductCode`  | Text    | Unique product code              |
| `ProductName`  | Text    | Product name                     |
| `Unit`         | Text    | Unit of measure (PCS / BOX etc.) |
| `StdCycleTime` | Number  | Standard cycle time (min/pc)     |
| `StdScrapPct`  | Number  | Standard scrap percentage        |
| `SellingPrice` | Number  | Selling price per unit           |

> **Important:** `ID` must exist and be the first row header – the script depends on it.

---

### 2. `MASTER_MACHINE`

Used for machine master data.

| Column Name   | Type   | Description                         |
| ------------- | ------ | ----------------------------------- |
| `ID`          | Number | Auto-generated unique ID            |
| `MachineCode` | Text   | Unique machine code                 |
| `MachineName` | Text   | Machine name                        |
| `Capacity`    | Number | Capacity (units per shift)          |
| `Location`    | Text   | Machine location / line / section   |

---

### 3. `PRODUCTION_LOG`

Used for daily production entries.

| Column Name   | Type   | Description                     |
| ------------- | ------ | ------------------------------- |
| `ID`          | Number | Auto-generated unique ID        |
| `Date`        | Date   | Production date                 |
| `Shift`       | Text   | Shift (A / B / C)               |
| `ProductCode` | Text   | Product code                    |
| `ProductName` | Text   | Product name                    |
| `BatchNo`     | Text   | Batch number                    |
| `MachineCode` | Text   | Machine code                    |
| `MachineName` | Text   | Machine name                    |
| `PlannedQty`  | Number | Planned quantity                |
| `ActualQty`   | Number | Actual produced quantity        |
| `ScrapQty`    | Number | Scrap quantity                  |
| `Status`      | Text   | Status (In Progress / Completed)|

The first row of each sheet **must be the headers** exactly matching the above names.

---

## 🧠 How It Works (Architecture)

### Backend: `Code.gs`

Core responsibilities:

- `doGet()`  
  Renders `index.html` as a web app.

- `getDataAsObjects_(sheetName)`  
  - Reads all data from the given sheet  
  - Uses the first row as headers  
  - Returns an array of objects like:  
    `{ ProductCode: "...", ProductName: "...", ... }`

- `saveObject_(sheetName, obj)`  
  - If `obj.ID` exists → update that row  
  - If not → generate new numeric ID and append as a new row  

- `deleteById_(sheetName, id)`  
  - Finds row with matching `ID` and deletes it

Exposed API functions:

- **Products**  
  - `getProducts()`  
  - `saveProduct(product)`  
  - `deleteProduct(id)`

- **Machines**  
  - `getMachines()`  
  - `saveMachine(machine)`  
  - `deleteMachine(id)`

- **Production Logs**  
  - `getProductionLogs()`  
  - `saveProductionLog(log)`  
  - `deleteProductionLog(id)`

All of these are called from the frontend via `google.script.run`.

---

### Frontend: `index.html`

- Responsive UI with tabs:
  - **Products** – product master CRUD  
  - **Machines** – machine master CRUD  
  - **Production Log** – log entry form  

- Each tab has:
  - A **form** with inputs  
  - A **table** showing existing records  
  - Action buttons: **Edit / Delete**

Key functions (JavaScript):

- `loadProducts()`, `renderProductTable(...)`, `saveProduct()`, `editProduct(...)`, `confirmDeleteProduct(...)`
- `loadMachines()`, `renderMachineTable(...)`, `saveMachine()`, `editMachine(...)`, `confirmDeleteMachine(...)`
- `loadProductionLogs()`, `renderLogTable(...)`, `saveProductionLog()`, `editLog(...)`, `confirmDeleteLog(...)`

On page load (`window.onload`), the app automatically calls:

```js
loadProducts();
loadMachines();
loadProductionLogs();
