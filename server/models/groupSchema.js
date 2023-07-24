import mongoose from 'mongoose';
import { Employee, ExcelSheet } from '../models/hrDataSchema.js';

const defaultGroupSchema = new mongoose.Schema({
  groupName: String,
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee'
    }
  ]
});

const customGroupSchema = new mongoose.Schema({
  groupName: String,
  headers: [String],
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ExcelSheet'
    }
  ]
});

const DefaultGroup = mongoose.model('DefaultGroup', defaultGroupSchema);
const CustomGroup = mongoose.model('CustomGroup', customGroupSchema);

export { DefaultGroup, CustomGroup };
