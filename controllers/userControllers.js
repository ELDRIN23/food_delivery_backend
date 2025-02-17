import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";

export const userRegister = async (req, res) => {
  try {
    // console.log("user sighnup")
    // console.log(req.body)
    const { name, address, email, password, phone } = req.body;
    // console.log(req.body);
    // console.log("hitted")

    if (!name || !address || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const profilePicUrl = req.cloudinaryResult?.secure_url || null;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      address,
      email,
      password: hashedPassword,
      phone,
      profilePic: profilePicUrl,
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

    res.status(200).json({ success: true, message: "Signin successful", user });
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
    const { name, address, phone } = req.body;
    const user = await User.findById(req.user.id);
    if (!User) {
      res.status(400).json({ message: "user not found" });
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

// import User from "../models/userModel.js";
// import bcrypt from "bcrypt";
// import { generateToken } from "../utils/token.js";

// export const userRegister = async (req, res) => {
//     try {
//         const { name, address, email, password, phone } = req.body;

//         if (!name || !address || !email || !password || !phone) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new User({ name, address, email, password: hashedPassword, phone,});
//         await user.save();

//         const token = generateToken(user._id);
//         res.cookie("token", token);

//         res.status(201).json({ message: "User registered successfully", user });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// export const userSignin = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: "Invalid credentials" });
//         }

//         const token = generateToken(user._id);
//         res.cookie("token", token);

//         res.status(200).json({ message: "Signin successful", user });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// export const userLogout = (req, res) => {
//     res.clearCookie("token");
//     res.status(200).json({ message: "Logout successful" });
// };

// export const userProfile = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).select("-password");
//         res.status(200).json({ user });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// export const updateUserProfile = async (req, res) => {
//     try {
//         const { name, address, phone } = req.body;
//         const user = await User.findById(req.user.id);
//         if (!user) {
//             res.status(400).json({ message: "User not found" });
//         }
//         if (name) user.name = name;
//         if (address) user.address = address;
//         if (phone) user.phone = phone;

//         await user.save();
//         res.status(200).json({ message: "Profile updated successfully", user });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
