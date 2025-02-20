import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema({
   // resturant_id: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    image: { type: [String] },
    adders: { type: String, required: true },
    phone: { type: String, required: true },
    rating: { type: Number, default: 0 },
    menu: { type: String },
    role:{type: String, default:"restaurant"},
    operating_hours: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },
});
const Restaurant  = mongoose.model('Restaurant', RestaurantSchema);


export default  Restaurant

