import bcryptjs from 'bcryptjs';
import Employee from '../models/employee.model.js'; // Assuming you have a Pickup model

// Assuming you have a Pickup model

export const createEmployee = async (req, res, next) => {
  const { name, NIC, contactno,email } = req.body;
  
  try {
  
    if (!name || !NIC || !contactno || !email) {
      return res.status(400).json({ error: 'Lane, date, and time are required' });
    }

    const newEmployee= new Employee({
      name,
      NIC,
      contactno,
      email
    });

    await newEmployee.save();
    
    res.status(201).json('Employee created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating Employee' });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.find();
    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching employee' });
  }
};
export const updateEmployee = async (req, res, next) => {
  try {
    const { name, NIC, contactno,email } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      {name, NIC, contactno,email },
      { new: true }
    );

    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating Employee' });
  }
};


//delete user

export const deleteEmployee = async (req, res, next) => {
  try {
    const employee= await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'employee not found' });
    }

    await employee.deleteOne(); // Use deleteOne() instead of remove()

    res.status(200).json({ message: 'employee has been deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting employee' });
  }
};
