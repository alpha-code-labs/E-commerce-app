import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  employeeName: String,
  employeeId: String,
  designation: String,
  department: String,
  grade: String,
  costCenter: String,
  noOfYears: Number
});

const groupSchema = new mongoose.Schema({
  employeeName: String,
  designation: String,
  department: String,
  grade: String,
  noOfYears: Number
});

const Employee = mongoose.model('Employee', employeeSchema);
const Group = mongoose.model('Group', groupSchema);

export { Employee, Group };
