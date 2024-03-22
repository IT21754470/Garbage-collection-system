import specialPickup from '../models/special.model.js'; 
import mongoose from 'mongoose';

export const specialcreatePickup = async (req, res, next) => {
  const { garbagetype, estimatedsize } = req.body;

  try {
    if (!garbagetype || !estimatedsize) {
      return res.status(400).json({ error: 'Garbage type and estimated size are required' });
    }

    const newPickup = new specialPickup({
      garbagetype,
      estimatedsize
    });

    await newPickup.save();

    res.status(201).json('Special Pickup created successfully');
  } catch (error) {
    console.error(error);
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

    const updatedPickup = await specialPickup.findByIdAndUpdate(
      id,
      { accepted: true },
      { new: true }
    );
    if (!updatedPickup) {
      return res.status(404).json({ error: 'Special pickup not found' });
    }
    res.json(updatedPickup);
  } catch (error) {
    console.error('Error accepting special pickup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const rejectSpecialPickup = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid pickup ID' });
    }

    const updatedPickup = await specialPickup.findByIdAndUpdate(
      id,
      { rejected: true, accepted: false },
      { new: true }
    );

    if (!updatedPickup) {
      return res.status(404).json({ error: 'Special pickup not found' });
    }

    res.json(updatedPickup);
  } catch (error) {
    console.error('Error rejecting special pickup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
