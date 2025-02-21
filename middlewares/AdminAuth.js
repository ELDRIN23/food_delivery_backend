import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
            
     
             if (!authHeader || !authHeader.startsWith("Bearer ")) {
                 return res.status(401).json({ message: "User not authorized", success: false });
             }
     
             // Extract token from Authorization header
             const token = authHeader.split(" ")[1];
             
             // Verify the token
             const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
           
        console.log(decodedToken)

        // Check if the user's role is admin
        if (decodedToken.role !== "admin") {
           return res.status(403).json({ message: "Access denied. Admins only.", success: false });
       }

        // Attach user details to the request object
        req.user = decodedToken;

        next();
    } catch (error) {
        return res.status(401).json({
            message: error.message || "Admin authorization failed",
            success: false,
        });
    }
};

export { adminAuth as adminAuthMiddleware };
