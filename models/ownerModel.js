import mongoose from 'mongoose';

const restaurantOwnerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: {type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Owner', 'admin'], default: 'Owner' },
    phone: {type: String, required: true},
    profilePic:{type: String ,default:" " },
    createdAt: { type: Date, default: Date.now },
  });

export const Owner = mongoose.model('Owner', restaurantOwnerSchema);
