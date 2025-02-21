import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const userAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
       

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "User not authorized", success: false });
        }

        // Extract token from Authorization header
        const token = authHeader.split(" ")[1];
        
        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      

        // Fetch user from database
        const user = await userModel.findById(decodedToken.id).select("-password");
       
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        req.user = user; // Attach user details to request
        next();
    } catch (error) {
        console.error("Authorization Error: ", error);
        return res.status(401).json({ 
            message: error.message || "User authorization failed", 
            success: false 
        });
    }
};

export { userAuth as userAthmiddleware };
