import xlsx from 'xlsx';
import { Employee, Group } from '../models/hrDataSchema.js';

const extractDataFromExcel = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

  const headers = jsonData[0];

  const data = jsonData.slice(1).map((row) => {
    const rowData = {};
    row.forEach((value, index) => {
      rowData[headers[index]] = value;
    });
    return rowData;
  });

  return data;
};

const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = req.file.path;
  const data = extractDataFromExcel(filePath);

  try {
    await Employee.insertMany(data);
    return res.status(200).json({ message: 'Data saved successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to save data to MongoDB' });
  }
};

const createGroup = async (req, res) => {
  const {employeeName,designation, department, grade, noOfYears } = req.body;

  const group = new Group({employeeName, designation, department, grade, noOfYears });

  try {
    await group.save();
    return res.status(200).json({ message: 'Group created successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create group' });
  }
};

export { uploadFile, createGroup };
