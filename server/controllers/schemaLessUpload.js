import xlsx from 'xlsx';
import mongoose from 'mongoose';

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

const SchemalessUploadSchema = new mongoose.Schema({
  masterId: String,
  masterName: String,
  data: mongoose.Schema.Types.Mixed,
});

const SchemalessUpload = mongoose.model('SchemalessUpload', SchemalessUploadSchema);

const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = req.file.path;
  const data = extractDataFromExcel(filePath);

  const masterId = req.body.masterId;
  const masterName = req.body.masterName;

  if (!masterId || !masterName) {
    return res.status(400).json({ error: 'Master ID and Master Name are required' });
  }

  try {
    const newUpload = new SchemalessUpload({
      masterId,
      masterName,
      data,
    });

    await newUpload.save();

    return res.status(200).json({
      message: 'Data saved successfully',
      insertedId: newUpload._id,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to save data to MongoDB' });
  }
};

export { uploadFile };
