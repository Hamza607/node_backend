const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeControler");

router.post("/employee", employeeController.createEmployee);
router.get("/employee", employeeController.getAllEmployees);
router.get("/employee/:id", employeeController.getEmployeeById);
router.put("/employee/:id", employeeController.updateEmployee);
router.delete("/employee/:id", employeeController.deleteEmployee);

router.post('/:id/experience', employeeController.addExperience);
router.post('/:id/education', employeeController.addEducation);

module.exports = router;
