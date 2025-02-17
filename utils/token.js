import jwt from "jsonwebtoken";

export const generateToken = (id, role) => {
    try {
        return jwt.sign({ id, role }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
    } catch (error) {
        console.log("Error generating token:", error);
    }
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
        console.log("Error verifying token:", error);
        return null;
    }
};

export const decodeToken = (token) => {
    try {
        return jwt.decode(token);
    } catch (error) {
        console.log("Error decoding token:", error);
        return null;
    }
};


