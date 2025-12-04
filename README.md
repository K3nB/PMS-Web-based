

# 🏭 Production Management System (Google Sheets + Apps Script)

A lightweight **production management system** built for MSME manufacturers.  
Frontend is a single-page web app (HTML/CSS/JS), backend is **Google Apps Script**, and **Google Sheets** is used as the database.

> Designed for: small factories / MSMEs that want simple production tracking without a full ERP.

---
### 🔗 Web page link : [Click here](https://script.google.com/macros/s/AKfycbzbRRRKfUHErRTmnmRAc6I2Wv3Zr7H1iL8e8IlqyChMftx_R9_Zw2NeCdOCCrUE8Vs/exec)
## ✨ Features

- 📦 **Product Master**
  - Manage product codes, names, units
  - Track standard cycle time, scrap % and selling price

- ⚙️ **Machine Master**
  - Register machines with code, name, capacity and location

- 📋 **Production Log**
  - Shift-wise production entry
  - Batch number, planned qty, actual qty, scrap qty & status

- 🔗 **Google Sheets as Database**
  - All CRUD operations (Create / Read / Update / Delete) are persisted in Sheets
  - Easy to export, backup and audit data

- 🎨 Modern UI
  - Gradient header, tab navigation and card-style sections
  - Responsive layout, usable on desktop and tablet

---

## 🧱 Tech Stack

- **Frontend:**  
  - HTML5  
  - CSS3 (custom styling, no framework)  
  - Vanilla JavaScript

- **Backend:**  
  - Google Apps Script (server-side JS)

- **Database:**  
  - Google Sheets (multiple sheets used as tables)

---

## 🗂 Project Structure

- `Code.gs`  
  - Backend logic  
  - CRUD functions for:
    - `MASTER_PRODUCT`
    - `MASTER_MACHINE`
    - `PRODUCTION_LOG`
  - Helper functions to read/write Sheet rows as JSON objects

- `index.html`  
  - Single-page web app UI  
  - Tabs: **Products**, **Machines**, **Production Log**  
  - Uses `google.script.run` to call Apps Script functions

- `README.md`  
  - Project documentation (this file)

---

## 📊 Google Sheets Structure

Create a new Google Sheet and add the following sheets:

### 1. `MASTER_PRODUCT`

| Column       | Description                     |
|-------------|---------------------------------|
| `ID`        | Auto numeric ID (managed by script) |
| `ProductCode` | Unique product code            |
| `ProductName` | Product name                   |
| `Unit`      | PCS / BOX / etc.                |
| `StdCycleTime` | Standard cycle time (min/pc) |
| `StdScrapPct`  | Expected scrap percentage     |
| `SellingPrice` | Selling price per unit       |

---

### 2. `MASTER_MACHINE`

| Column       | Description                     |
|-------------|---------------------------------|
| `ID`        | Auto numeric ID                 |
| `MachineCode` | Unique machine code           |
| `MachineName` | Machine name                  |
| `Capacity`  | Units per shift                 |
| `Location`  | Line / bay / area              |

---

### 3. `PRODUCTION_LOG`

| Column       | Description                                 |
|-------------|---------------------------------------------|
| `ID`        | Auto numeric ID                             |
| `Date`      | Production date                             |
| `Shift`     | A / B / C                                   |
| `ProductCode` | Product code (can be scanned)             |
| `ProductName` | Product name                              |
| `BatchNo`   | Batch number                                |
| `MachineCode` | Machine code                              |
| `MachineName` | Machine name                              |
| `PlannedQty`  | Planned quantity                          |
| `ActualQty`   | Actual produced quantity                  |
| `ScrapQty`    | Scrap quantity                            |
| `Status`      | In Progress / Completed                   |

> ⚠️ Column **names must match exactly** what the script expects (`ID`, `ProductCode`, etc.) or CRUD will break.

---

## 🚀 Setup & Deployment

### 1. Copy the Code

1. Open the Google Sheet.
2. Go to **Extensions → Apps Script**.
3. Replace any starter code with `Code.gs` from this repo.
4. Create a new HTML file called `index` and paste the content of `index.html`.

### 2. Connect to the Sheets

- Make sure sheet names are exactly:
  - `MASTER_PRODUCT`
  - `MASTER_MACHINE`
  - `PRODUCTION_LOG`

The script uses these constants:

const SH_PRODUCTS = 'MASTER_PRODUCT';
const SH_MACHINES = 'MASTER_MACHINE';
const SH_PROD_LOG = 'PRODUCTION_LOG';


Change them only if your sheet names are different.

### 3. Deploy as Web App

1. In Apps Script, click **Deploy → New deployment**.
2. Select **Web app**.
3. **Execute as:** `Me`
4. **Who has access:**

   * `Anyone with the link` (for open use)
   * or `Only in your domain` (for internal use)
5. Click **Deploy** and copy the Web App URL.

This URL is your **live production management system**.

---

## 🧪 Sample Data

You can quickly test the app by adding demo rows:

### Example product row (`MASTER_PRODUCT`)

| ID | ProductCode | ProductName | Unit | StdCycleTime | StdScrapPct | SellingPrice |
| -- | ----------- | ----------- | ---- | ------------ | ----------- | ------------ |
| 1  | LED32TV     | 32" LED TV  | PCS  | 8            | 2           | 11500        |

### Example machine row (`MASTER_MACHINE`)

| ID | MachineCode | MachineName      | Capacity | Location |
| -- | ----------- | ---------------- | -------- | -------- |
| 1  | ASM01       | TV Assembly Line | 220      | Line 1   |

### Example production log (`PRODUCTION_LOG`)

| ID | Date       | Shift | ProductCode | ProductName | BatchNo   | MachineCode | MachineName      | PlannedQty | ActualQty | ScrapQty | Status    |
| -- | ---------- | ----- | ----------- | ----------- | --------- | ----------- | ---------------- | ---------- | --------- | -------- | --------- |
| 1  | 2025-12-01 | A     | LED32TV     | 32" LED TV  | B-LED32-1 | ASM01       | TV Assembly Line | 180        | 172       | 6        | Completed |

---

## 🖼 UI Preview

Product Master

<img width="781" height="834" alt="image" src="https://github.com/user-attachments/assets/33e774d6-9f86-4e65-bbd0-5d3db9ff30a1" />


Machine Master

<img width="709" height="772" alt="image" src="https://github.com/user-attachments/assets/c30730b1-ca34-4de9-ab68-ee1e50e34d10" />


Production Log Entry

<img width="910" height="727" alt="image" src="https://github.com/user-attachments/assets/d0866600-32b0-4daa-8f78-a2a8072781e9" />


---

## 🔧 Customization Ideas

* Add **Operator Master** and link operators to production logs
* Add **BOM & Material Inventory** (raw material consumption per production entry)
* Add **Dashboards** using Google Sheets charts
* Protect certain sheets or ranges (read-only for shop floor users)

---

## 📄 License

This project is open for personal and internal company use.
Feel free to fork and modify as per your MSME needs.

---

## ✍️ Author

**Satanand**
mail at: satanand74@gmail.com for more query
```
More Projects are on the way so stay connected with me.
```
