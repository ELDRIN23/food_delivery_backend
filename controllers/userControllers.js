import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";

export const userRegister = async (req, res) => {
  try {
    // console.log("user sighnup")
    // console.log(req.body)
    const { name, address, email, password, phone, image } = req.body;
    // console.log(req.body);
    // console.log("hitted")

    if (!name || !address || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
 

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      address,
      email,
      password: hashedPassword,
      phone,
      profilePic: image || "",
  
    });
    await user.save();

    const token = generateToken(user._id);

    res.cookie("token", token);
    res.status(201).json({
      message: "User registered successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profilePic: user.profilePic,
        role: user.role,
        token
      },
    });

    // res.status(201).json({ message: "User registered successfully", data:user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const userSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    res.cookie("token", token);


    res.status(200).json({ success: true, message: "Signin successful", user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const userLogout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};

export const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, address, phone,image  } = req.body;
    const user = await User.findById(req.user.id);
    if (!User) {
      res.status(400).json({ message: "user not found" });
    }
    // user.profilePic
    if (image) user.profilePic = image;
    if (name) user.name = name;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    // const profilePicUrl = req.cloudinaryResult?.secure_url || null;
    await user.save();
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    console.log("get all users")
    const users = await User.find().select("-password").lean();
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

