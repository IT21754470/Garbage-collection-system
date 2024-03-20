import mongoose from 'mongoose';

const pickupSchema = new mongoose.Schema({
  lane: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Pickup = mongoose.model('Pickup', pickupSchema);

export default Pickup;

