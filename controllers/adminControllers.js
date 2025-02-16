import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/token.js";
import  {Admin} from "../models/adminModel.js"

export const restaurantAdminRegister = async (req, res, next) => {
  
  try {
    const { name, email, phone, password } =
      req.body;

    if (!name || !email  || !phone || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const isperson = await Admin.findOne({ email });
    if (isperson) {
      return res
        .status(400)
        .json({ message: "Person already exists", success: false });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const personData = new Admin({
      name,

      email,
      password: hashedPassword,
      phone,
      role:"admin"

    });
    await personData.save();

    const token = generateToken(personData._id, personData.role);
    res.cookie("token", token);

   
      return res
        .status(201)
        .json({
          data: personData,
          message: "Admin account created successfully",
          success: true,
        });
        

  } catch (error) {
    return res
      .status(500)
      .json({
        message: error.message || "Internal server error",
        success: false,
      });
  }
};

export const restaurantAdminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExist = await Admin.findOne({ email });
    if (!userExist) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const passwordMatch = bcrypt.compareSync(password, userExist.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const token = generateToken(userExist._id, userExist.role);
    res.cookie("token", token);

    if (userExist.role == "restaurantOwner") {
      return res
        .status(200)
        .json({
          data: userExist,
          message: "Restaurant owner logged in successfully",
          success: true,
        });
    }

    if (userExist.role == "admin") {
      return res
        .status(200)
        .json({
          data: userExist,
          message: "Admin logged in successfully",
          success: true,
        });
    }

    return res
      .status(403)
      .json({ message: "Access denied. Role not recognized.", success: false });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

export const restaurantAdminProfile = async (req, res, next) => {
  try {
    const personRole = req.person.role;
    const personId = req.person.id;

    const personData = await Restaurantowner.findById(personId).select(
      "-password"
    );

    if (personRole === "restaurantAdmin") {
      return res
        .status(200)
        .json({
          message: "Restaurant owner profile fetched successfully.",
          data: personData,
          success: true,
        });
    }

    if (personRole === "admin") {
      return res
        .status(200)
        .json({
          message: "Admin profile fetched successfully.",
          data: personData,
          success: true,
        });
    }

    return res
      .status(403)
      .json({
        message: "Access denied. Insufficient permissions.",
        success: false,
      });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

export const restaurantAdminLogout = async (req, res, next) => {
  try {
    const {_id}=req.body
    if (!_id){
      return res.json({ message: "id not found" });
    }
    res.clearCookie("token");
    return res.json({ message: "Logout success" });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

export const updateRestaurantAdminProfile = async (req, res, next) => {
    try {
          const { name, address, phone} = req.body;
          const user = await Admin.findById(req.user.id);
          if(!user){
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
