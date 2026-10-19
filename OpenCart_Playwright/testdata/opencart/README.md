This folder contains sample login test data.

Files:
- logindata.json — sample JSON login entries
- logindata.csv — sample CSV login entries
- make_logindata_xlsx.py — script to generate `logindata.xlsx` from `logindata.csv`

To generate the Excel file:

```bash
pip install openpyxl
python OpenCart_Playwright/testdata/opencart/make_logindata_xlsx.py
```

After running, `logindata.xlsx` will be created in this folder.
