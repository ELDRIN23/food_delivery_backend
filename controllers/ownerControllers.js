
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {generateToken} from '../utils/token.js';
import { Owner } from '../models/ownerModel.js';

export const restaurantownerRegister = async (req, res, next) => {

    try {
        const { name, address, email, password, phone, } = req.body;

        if (!name || !address || !email || !password || !phone ) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const isperson = await Owner.findOne({ email });
        if (isperson) {
            return res.status(400).json({ message: "Person already exists", success: false });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const personData = new Owner({ name, address, email, password: hashedPassword, phone, role:"restaurantOwner"});
        await personData.save();

        console.log(personData.role);
        
        const token = generateToken(personData._id, personData.role);

        console.log(token);
        
        res.cookie("token", token);

        if (personData.role === "admin") {
            return res.status(201).json({ data: personData, message: "Admin account created successfully", success: true });
        } else if (personData.role === "restaurantOwner") {
            return res.status(201).json({ data: personData, message: "Restaurant owner account created successfully", success: true });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};

export const restaurantownerLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExist = await Owner.findOne({ email });
        if (!userExist) {
            return res.status(404).json({ message: "User does not exist" });
        }

        const passwordMatch = bcrypt.compareSync(password, userExist.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const token = generateToken(userExist._id, userExist.role);
        console.log(token);
        
        res.cookie("token", token);

        // if (userExist.role === "restaurantOwner") {
        //     return res.status(200).json({ data: userExist, message: "Restaurant owner logged in successfully", success: true });
        // }

        // if (userExist.role === "admin") {
        //     return res.status(200).json({ data: userExist, message: "Admin logged in successfully", success: true });
        // }

        // return res.status(403).json({ message: "Access denied. Role not recognized.", success: false });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

export const restaurantownerProfile = async (req, res, next) => {
    try {


       const token = req.cookies.token
       const tokenData = jwt.decode(token);

       
       const personRole = tokenData.role;
       const personId = tokenData.id;

        const personData = await Owner.findById(personId).select("-password");

        if (personRole === "restaurantOwner") {
            return res.status(200).json({ message: "Restaurant owner profile fetched successfully.", data: personData, success: true });
        }

        if (personRole === "admin") {
            return res.status(200).json({ message: "Admin profile fetched successfully.", data: personData, success: true });
        }

        return res.status(403).json({ message: "Access denied. Insufficient permissions.", success: false });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

export const restaurantownerLogout = async (req, res, next) => {
    try {
        const {_id}=req.body
        if (!_id){
          return res.json({ message: "id not found" });
        }
        res.clearCookie("token");
        return res.json({ message: "Logout success" });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

export const updateRestaurantownerProfile = async (req, res, next) => {
        try {
            const { name, address, phone} = req.body;
            const user = await Owner.findById(req.user.id);
            if(!Owner){
                res.status(400).json({ message: "user not found"});
            }
            if (name) user.name = name;
            if (address) user.address = address;
            if (phone) user.phone = phone;
          
            await user.save();
            res.status(200).json({ message: "Profile updated successfully", user });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
};


// export {
//     restaurantownerRegister,
//     restaurantownerProfile,
//     restaurantownerLogout,
//     updateRestaurantownerProfile
// };
