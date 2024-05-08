import mongoose from 'mongoose';

const specialpickupSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true
  },
  garbagetype: {
    type: String,
    required: true
  },
  estimatedsize: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true,
 },
 location: {
    type: String,
    required: true,
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
