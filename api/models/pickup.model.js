import mongoose from 'mongoose';

const pickupSchema = new mongoose.Schema({
    lane: {
        name: {
            type: String,
            required: true,
            enum: ['Lane A', 'Lane B', 'Lane C'],
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
    },
}, { timestamps: true });

const Pickup = mongoose.model('Pickup', pickupSchema);

export default Pickup;
