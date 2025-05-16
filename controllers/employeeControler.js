const Employee = require("../models/Employee");

exports.createEmployee = async (req, res) => {
  try {
     if (!Array.isArray(req.body.education) || req.body.education.length === 0) {
      return res.status(400).json({ error: "Education is required" });
    }
     if (!Array.isArray(req.body.experience) || req.body.experience.length === 0) {
      return res.status(400).json({ error: "Experience is required" });
    }
     if (!Array.isArray(req.body.skills) || req.body.skills.length === 0) {
      return res.status(400).json({ error: "Skill is required" });
    }
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addExperience = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    employee.experience.push(req.body);
    await employee.save();

    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addEducation = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    employee.education.push(req.body);
    await employee.save();

    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
