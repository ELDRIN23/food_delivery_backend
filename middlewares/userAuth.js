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

const userAuth = (req, res, next) => {
    try {
        const token = req.cookies.token; // Extract token from cookies
        if (!token) {
            return res.status(401).json({ message: "User not authorized", success: false });
        }

        // Verify the token using the secret key
        const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Attach user details to the request object
        req.user = tokenVerified;

        next();
    } catch (error) {
        return res.status(401).json({ 
            message: error.message || "User authorization failed", 
            success: false 
        });
    }
};

export { userAuth as userAthmiddleware };