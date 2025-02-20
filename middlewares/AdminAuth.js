import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
    try {
        const token = req.cookies.token; // Extract token from cookies
console.log(token)
        if (!token) {
            return res.status(401).json({ message: "Admin not authorized", success: false });
        }

        // Verify the token using the secret key
        const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);

        console.log(tokenVerified)

        // Check if the user's role is admin
        if (tokenVerified.role !== "admin") {
           return res.status(403).json({ message: "Access denied. Admins only.", success: false });
       }

        // Attach user details to the request object
        req.user = tokenVerified;

        next();
    } catch (error) {
        return res.status(401).json({
            message: error.message || "Admin authorization failed",
            success: false,
        });
    }
};

export { adminAuth as adminAuthMiddleware };
