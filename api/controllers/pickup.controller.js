import bcryptjs from 'bcryptjs';
import Pickup from '../models/pickup.model.js'; // Assuming you have a Pickup model


export const test=async(req,res)=>{
    try {
      const users = await User.find(); 
      res.status(200).json(users); 
  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal server error' }); 
  }
  };
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
