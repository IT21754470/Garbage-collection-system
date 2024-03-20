import bcryptjs from 'bcryptjs';
import specialPickup from '../models/special.model.js'; 


export const specialcreatePickup = async (req, res, next) => {
  const { garbagetype,estimatedsize} = req.body;
  
  try {
  
    if (!garbagetype || !estimatedsize) {
      return res.status(400).json({ error: 'garbage type and estimated size is required' });
    }

    const newPickup = new specialPickup({
      garbagetype,
      estimatedsize
    });

    await newPickup.save();
    
    res.status(201).json('special Pickup created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating special pickup' });
  }
};

export const specialgetPickup = async (req, res) => {
  try {
    const schedules = await specialPickup.find();
    res.status(200).json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching special pickup' });
  }
};
