import express from 'express';
import multer from 'multer';
import { uploadFile } from '../controllers/hrDataController.js';
import { Employee } from '../models/hrDataSchema.js';

const router = express.Router();

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// // Route for importing an Excel sheet
// router.post('/import', upload.single('file'), importExcelSheet);

// Route for uploading an Excel file
router.post('/upload', upload.single('file'), uploadFile);

// // Route for extracting data from an Excel file
// router.post('/extract-data', (req, res) => {
//   const { filePath } = req.body;
//   const data = extractDataFromExcel(filePath);
//   res.status(200).json(data);
// });

export default router;
