import express from 'express';
import multer from 'multer';
import { uploadFile } from '../controllers/schemaLessUpload.js';

const router = express.Router();

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Route to upload Excel file and save data
router.post('/upload', upload.single('file'), uploadFile);

export default router;
