import bcryptjs from 'bcryptjs';
import Pickup from '../models/pickup.model.js'; // Assuming you have a Pickup model

// Assuming you have a Pickup model

export const createPickup = async (req, res, next) => {
  const { lane, date, time } = req.body;
  
  try {
  
    if (!lane || !date || !time) {
      return res.status(400).json({ error: 'Lane, date, and time are required' });
    }

    const newPickup = new Pickup({
      lane,
      date,
      time
    });

    await newPickup.save();
    
    res.status(201).json('Pickup created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating pickup' });
  }
};

export const getSchedule = async (req, res) => {
  try {
    const schedules = await Pickup.find();
    res.status(200).json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching schedules' });
  }
};
export const updateSchedule = async (req, res, next) => {
  try {
    const { lane, date, time } = req.body;
    const updatedPickup = await Pickup.findByIdAndUpdate(
      req.params.id,
      { lane, date, time },
      { new: true }
    );

    res.status(200).json(updatedPickup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating pickup' });
  }
};


//delete user

export const deleteSchedule = async (req, res, next) => {
  try {
    const pickup = await Pickup.findById(req.params.id);
    if (!pickup) {
      return res.status(404).json({ error: 'Pickup not found' });
    }

    await pickup.deleteOne(); // Use deleteOne() instead of remove()

    res.status(200).json({ message: 'Pickup has been deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting pickup' });
  }
};
