import { DefaultGroup, CustomGroup } from '../models/groupSchema.js';
import { Employee, ExcelSheet } from '../models/hrDataSchema.js';

const createDefaultGroup = async (req, res) => {
  const { groupName } = req.body;

  try {
    // Get all employees with the default headers
    const employees = await Employee.find(
      { },
      'employeeName designation department grade'
    );

    const defaultGroup = new DefaultGroup({
      groupName,
      employees
    });

    await defaultGroup.save();

    return res.status(200).json({ message: 'Default group created successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create default group' });
  }
};

const createCustomGroup = async (req, res) => {
  const { groupName, headers } = req.body;

  try {
    // Get all employees with the selected headers
    const employees = await Employee.find(
      { },
      headers.join(' ')
    );

    const customGroup = new CustomGroup({
      groupName,
      headers,
      employees
    });

    await customGroup.save();

    return res.status(200).json({ message: 'Custom group created successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create custom group' });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    return res.status(200).json(employees);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve employees' });
  }
};

const getGroups = async (req, res) => {
  try {
    const defaultGroups = await DefaultGroup.find();
    const customGroups = await CustomGroup.find();

    return res.status(200).json({ defaultGroups, customGroups });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve groups' });
  }
};

const updateEmployee = async (req, res) => {
  const { employeeId } = req.params;
  const { employeeName, designation, department, grade, costCenter, noOfYears } = req.body;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      { employeeName, designation, department, grade, costCenter, noOfYears },
      { new: true }
    );

    return res.status(200).json(updatedEmployee);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update employee' });
  }
};

const updateGroup = async (req, res) => {
  const { groupId } = req.params;
  const { groupName, headers, employees } = req.body;

  try {
    let updatedGroup;

    if (groupId.startsWith('DefaultGroup')) {
      updatedGroup = await DefaultGroup.findByIdAndUpdate(
        groupId,
        { groupName, employees },
        { new: true }
      );
    } else if (groupId.startsWith('CustomGroup')) {
      updatedGroup = await CustomGroup.findByIdAndUpdate(
        groupId,
        { groupName, headers, employees },
        { new: true }
      );
    } else {
      return res.status(404).json({ error: 'Group not found' });
    }

    return res.status(200).json(updatedGroup);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update group' });
  }
};

const deleteEmployee = async (req, res) => {
  const { employeeId } = req.params;

  try {
    await Employee.findByIdAndRemove(employeeId);

    return res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete employee' });
  }
};

const deleteGroup = async (req, res) => {
  const { groupId } = req.params;

  try {
    let deletedGroup;

    if (groupId.startsWith('DefaultGroup')) {
      deletedGroup = await DefaultGroup.findByIdAndRemove(groupId);
    } else if (groupId.startsWith('CustomGroup')) {
      deletedGroup = await CustomGroup.findByIdAndRemove(groupId);
    } else {
      return res.status(404).json({ error: 'Group not found' });
    }

    // Optionally, you can also remove references to the group in any other entities

    return res.status(200).json({ message: 'Group deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete group' });
  }
};

export {
  createDefaultGroup,
  createCustomGroup,
  getEmployees,
  getGroups,
  updateEmployee,
  updateGroup,
  deleteEmployee,
  deleteGroup
};
