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
  const { id } = req.params; // Pickup ID to accept

  try {
    // Ensure that the provided ID is a valid MongoDB ObjectID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid pickup ID' });
    }

    const pickup = await specialPickup.findById(id);

    // If no pickup is found with the given ID
    if (!pickup) {
      return res.status(404).json({ error: 'Special pickup not found' });
    }

    // Ensure that the pickup has a userId associated with it
    if (!pickup.userId) {
      console.error('Special pickup is missing userId'); // Log the issue
      return res.status(400).json({ error: 'User ID is required to accept special pickup' });
    }

    // Mark the pickup as accepted
    pickup.accepted = true;

    // Save the updated pickup information to the database
    await pickup.save();

    // Create a notification for the user indicating that their pickup request has been accepted
    const notification = new Notification({
      userId: pickup.userId,
      message: 'Your special pickup request has been accepted!',
    });

    // Save the notification to the database
    await notification.save();

    // Respond with the updated pickup details
    res.status(200).json({ message: 'Pickup accepted', pickup });
  } catch (error) {
    console.error('Error accepting special pickup:', error); // Log the error for debugging
    res.status(500).json({ error: 'Internal server error' }); // Respond with a generic error message
  }
};


export const rejectSpecialPickup = async (req, res) => {
  const { id } = req.params;

  try {
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

    res.status(200).json(pickup);
  } catch (error) {
    console.error('Error rejecting special pickup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

