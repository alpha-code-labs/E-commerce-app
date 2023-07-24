import mongoose from 'mongoose';
import xlsx from 'xlsx';

// Original file
const excelSheetSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String, 
  fileName: String 
});


const getHeaders = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

  return jsonData[0];
};



const employeeSchema = new mongoose.Schema({
  employeeName: String,
  employeeId: String,
  designation: String,
  department: String,
  grade: String,
  costCenter: String,
  noOfYears: Number
});

const ExcelSheet = mongoose.model('ExcelSheet', excelSheetSchema);
const Employee = mongoose.model('Employee', employeeSchema);

export {getHeaders, ExcelSheet, Employee};