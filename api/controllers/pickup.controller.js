import bcryptjs from 'bcryptjs';
import Pickup from '../models/pickup.model.js'; // Assuming you have a Pickup model



export const createPickup = async (req, res, next) => {
  const { laneName, date, time } = req.body;
  
  try {
 
    const newPickup = new Pickup({
      lane: {
        name: laneName,
        date: new Date(date),
        time: time
      }
    });

   
    await newPickup.save();
    
    res.status(201).json('Pickup created successfully');
  } catch (error) {
    console.error(error);
    next(errorHandler(500, 'Error creating pickup'));
  }
};
