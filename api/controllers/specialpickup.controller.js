import specialPickup from '../models/special.model.js'; 
import Notification from '../models/notification.model.js';

import mongoose from 'mongoose';

export const specialcreatePickup = async (req, res) => {
  const { garbagetype, estimatedsize, userId } = req.body;

  // Check if all required fields are provided
  if (!garbagetype || !estimatedsize || !userId) {
    return res.status(400).json({ error: 'Garbage type, estimated size, and user ID are required' });
  }

  // Validate if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    // Create a new special pickup
    const newPickup = new specialPickup({
      garbagetype,
      estimatedsize,
      userId,
    });

    // Save the new pickup to the database
    await newPickup.save();

    res.status(201).json('Special pickup created successfully');
  } catch (error) {
    console.error('Error creating special pickup:', error);
    res.status(500).json({ error: 'Error creating special pickup' });
  }
};


export const specialgetPickup = async (req, res) => {
  try {
    const pickups = await specialPickup.find();
    res.status(200).json(pickups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching special pickups' });
  }
};



export const acceptSpecialPickup = async (req, res) => {
  const { id } = req.params; 

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid pickup ID' });
    }

    const pickup = await specialPickup.findById(id);

    if (!pickup) {
      return res.status(404).json({ error: 'Special pickup not found' });
    }

    if (!pickup.userId) {
      console.error('Special pickup is missing userId'); 
      return res.status(400).json({ error: 'User ID is required to accept special pickup' });
    }

    pickup.accepted = true;
    pickup.rejected = false;
    await pickup.save();

    const notification = new Notification({
      userId: pickup.userId,
      message: `Your special pickup request for ${pickup.garbagetype} (Size: ${pickup.estimatedsize}) has been accepted.`,
    });

    await notification.save();

    res.status(200).json({ message: 'Pickup accepted', pickup });
  } catch (error) {
    console.error('Error accepting special pickup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const rejectSpecialPickup = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid pickup ID' });
    }

    const pickup = await specialPickup.findById(id);

    if (!pickup) {
      return res.status(404).json({ error: 'Special pickup not found' });
    }

    if (!pickup.userId) {
      console.error('Special pickup is missing userId');
      return res.status(400).json({ error: 'User ID is required to reject special pickup' });
    }

    pickup.rejected = true;
    pickup.accepted = false;
    await pickup.save();

    const notification = new Notification({
      userId: pickup.userId,
      message: `Your special pickup request for ${pickup.garbagetype} (Size: ${pickup.estimatedsize}) has been rejected.`,
    });

    await notification.save();

    res.status(200).json({ message: 'Pickup rejected', pickup });
  } catch (error) {
    console.error('Error rejecting special pickup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


