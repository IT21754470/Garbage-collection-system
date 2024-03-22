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
  accepted: {
    type: Boolean,
    default: false
  },
  rejected: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const SpecialPickup = mongoose.model('SpecialPickup', specialpickupSchema);

export default SpecialPickup;


