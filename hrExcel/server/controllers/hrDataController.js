import xlsx from 'xlsx';
import amqplib from 'amqplib'
import { ExcelSheet, Employee } from '../models/hrDataSchema.js';

const getEmployeeHeaders = async (req, res) => {
  try {
    const employees = await Employee.find();

    if (employees.length === 0) {
      return res.status(404).json({ error: 'No employees found' });
    }

    const headers = Object.keys(employees[0]._doc);

    return res.status(200).json({ headers });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve employee headers' });
  }
};


const getHeaders = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

  return jsonData[0];
};



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
const exchangeName = 'ex.logs'
 const msg = process.argv.slice(2).join('') || "Excell file uploaded successfully"

 const sendMsg = async () =>{
    const connection = await amqplib.connect('amqp://guest:Anandhu@1996@localhost')
    const channel = await connection.createChannel()    
    await channel.assertExchange(exchangeName,'fanout',{durable:true})
    channel.publish(exchangeName,'',Buffer.from(msg))
    console.log('Sent', msg)
    setTimeout(() =>{
        // connection.close()
        // process.exit(0)
    },500)
}

const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = req.file.path;
  const data = extractDataFromExcel(filePath);

  try {
    const createdEmployees = await Employee.insertMany(data);
    sendMsg()
    return res.status(200).json({
      message: 'Data saved successfully',
      employees: createdEmployees
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to save data to MongoDB' });
  }
};

export {getEmployeeHeaders,uploadFile , getHeaders };



// const importExcelSheet = async (req, res) => {
//   const { file } = req;

//   try {
//     const excelSheet = new ExcelSheet({
//       data: file.buffer,
//       contentType: file.mimetype,
//       fileName: file.originalname
//     });
//     await excelSheet.save();

//     const workbook = xlsx.read(file.buffer, { type: 'buffer' });
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];
//     const jsonData = xlsx.utils.sheet_to_json(worksheet);

//     const createdEmployees = [];

//     for (const employeeDetails of jsonData) {
//       const employee = new Employee(employeeDetails);
//       employee.excelSheet = excelSheet._id;

//       const createdEmployee = await employee.save();
//       createdEmployees.push(createdEmployee);
//     }

//     return res.status(200).json({
//       message: 'Excel sheet imported successfully',
//       employees: createdEmployees
//     });
//   } catch (err) {
//     return res.status(500).json({ error: 'Failed to import Excel sheet' });
//   }
// };