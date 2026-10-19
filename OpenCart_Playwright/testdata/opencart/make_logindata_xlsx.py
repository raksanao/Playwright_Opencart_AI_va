"""Generate logindata.xlsx from logindata.csv using openpyxl.
Run: pip install openpyxl
      python make_logindata_xlsx.py
"""
import csv
from openpyxl import Workbook

csv_path = "logindata.csv"
xlsx_path = "logindata.xlsx"

wb = Workbook()
ws = wb.active

with open(csv_path, newline='', encoding='utf-8') as f:
    reader = csv.reader(f)
    for row in reader:
        ws.append(row)

wb.save(xlsx_path)
print(f"Created {xlsx_path}")
