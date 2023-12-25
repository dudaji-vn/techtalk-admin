import * as XLSX from "xlsx";
import { IExportExcelParams } from "../interfaces/excel";
import Excel from "exceljs";

export const convertXLSXtoCSV = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const csvData = XLSX.utils.sheet_to_csv(workbook.Sheets[firstSheetName]);
        resolve(csvData);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
};

export const exportToExcel = async (params: IExportExcelParams) => {
  const { data, fileName, colInfo } = params;

  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("Sheet 1");
  worksheet.addRow(colInfo?.map((item) => item.name));

  if (colInfo && colInfo.length > 0) {
    colInfo.map((item, index) => {
      worksheet.getColumn(index + 1).width = item.width;
    });
    const rows = data.map((item) => Object.values(item));

    worksheet.addRows(rows);
  }

  worksheet.eachRow((item, rowNumber) => {
    item.height = 20;
    item.font = rowNumber === 1 ? { size: 16, bold: true } : { size: 16 };
    item.alignment = { horizontal: "center" };
  });
  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName || "output.xlsx";
  a.click();
  window.URL.revokeObjectURL(url);
};
