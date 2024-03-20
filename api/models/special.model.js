import mongoose from 'mongoose';

const specialpickupSchema = new mongoose.Schema({
  garbagetype: {
    type: String,
    required: true
  },
  estimatedsize: {
    type: String,
    required: true
  },
  
}, { timestamps: true });

const specialPickup = mongoose.model('specialPickup', specialpickupSchema);

export default specialPickup;

