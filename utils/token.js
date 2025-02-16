import jwt from "jsonwebtoken";

export const generateToken = (id, role) => {
    try {
        
       return jwt.sign({ id, role }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
    } catch (error) {
        console.log(error)
    }
};
