import fs from "fs";
import path from "path";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer storage setup
const storage = multer.diskStorage({
    destination: path.join(__dirname, "uploads"),
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const imageUpload = (req, res, next) => {
    upload.single("image")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        try {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "FOODI WEBSITE"
            });
            req.body.image = result.secure_url;

            // Remove the file from local storage
            fs.unlink(req.file.path, (error) => {
                if (error) {
                    console.error("Error deleting local file:", error);
                }
            });

            next();
        } catch (error) {
            return res.status(500).json({ message: "Error uploading file to Cloudinary" });
        }
    });
};

// Export the function
export default imageUpload;
