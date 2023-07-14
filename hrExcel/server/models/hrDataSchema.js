import mongoose from 'mongoose';

// Original file
const excelSheetSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String, 
  fileName: String 
});

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


export { ExcelSheet, Employee};