// import jwt from "jsonwebtoken";

//  const userAuth = (req, res, next) => {
//     try {
//         const token = req.cookies.token; // Extract token from cookies
//         console.log(token);
         
//         if (!token) {
//             return res.status(401).json({ message: "User not authorized", success: false });
//         }

//         // Verify the token using the secret key
//         const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);

//         // Attach user details to the request object
//         req.user = tokenVerified;

//         next();
//     } catch (error) {
//         return res.status(401).json({ 
//             message: error.message || "User authorization failed", 
//             success: false 
//         });
//     }
// };

// export{userAuth as userAthmiddleware };
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        console.log("Cookies: ", req.cookies);

        if (!token) {
            return res.status(401).json({ message: "User not authorized", success: false });
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decoded Token Data: ", decodedToken);

        // Fetch user from database
        const user = await userModel.findById(decodedToken.id).select("-password");
        console.log(user)
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