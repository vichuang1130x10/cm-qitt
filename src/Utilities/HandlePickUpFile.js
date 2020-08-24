import XLSX from "xlsx";

// read excel file
export function readxlsx(inputData) {
  const workbook = XLSX.read(inputData, { type: "binary", cellDates: true });
  return toJson(workbook);
}

// parsing excel obj to json
export function toJson(workbook) {
  let result = {};
  workbook.SheetNames.forEach((sheetName) => {
    const roa = XLSX.utils.sheet_to_row_object_array(
      workbook.Sheets[sheetName]
    );
    if (roa.length > 0) {
      result[sheetName] = roa;
    }
  });

  return result;
}
