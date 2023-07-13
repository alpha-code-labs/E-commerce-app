import express from 'express';
import multer from 'multer';
import { uploadFile, createGroup } from '../controllers/hrDataController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), uploadFile);
router.post('/group', createGroup);

export default router;
