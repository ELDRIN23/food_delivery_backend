import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    name: { type: String, required: true, maxLength: 30 },
    email: { type: String, unique: true, required: true, minLength: 3, maxLength: 30 },
    password: { type: String, required: true, minLength: 6 },
    profilepic: { type: String, default: "https://tse1.mm.bing.net/th?id=OIP.w-L3HP_7QYalYXw7apT2tAHaHx&pid=Api&P=0&h=180" },
    phone: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    role: { type: String, enum: ["admin", "owner"],default: "admin"},
});

export const Admin = mongoose.model("Admin", AdminSchema);
