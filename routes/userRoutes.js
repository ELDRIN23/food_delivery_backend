import express from "express";
import { userRegister, userSignin, userLogout, userProfile, updateUserProfile } from "../controllers/userControllers.js";
import {  userAthmiddleware } from "../middlewares/userAuth.js"; 
import { processUpload } from "../config/cloudinaryConfig.js";
import { generatePaymentIntent } from "../controllers/payment.js";
import { createOrder, fetchOrderDetails } from "../controllers/orderController.js";
import imageUpload from "../middlewares/ImageUpload/imageUpload.js";

const router = express.Router();

// Register
router.post('/signup',processUpload, userRegister);

// Signin
router.post('/login', userSignin);

// Logout
router.get('/logout',  userAthmiddleware, userLogout);

// Profile
router.get('/profile', userAthmiddleware, userProfile);

// Update Profile
router.put('/updateprofile', userAthmiddleware , imageUpload, updateUserProfile);

router.post("/create-payment-intent" , userAthmiddleware , generatePaymentIntent)

router.get('/create-order' , userAthmiddleware , createOrder)
router.get('/fetch-orders' , userAthmiddleware , fetchOrderDetails)

export {router as userRouter};

// import express from "express";
// import { userRegister, userSignin, userLogout, userProfile, updateUserProfile } from "../controllers/userControllers.js";
// import { userAthmiddleware } from "../middlewares/userAuth.js"; 
// // import { upload } from "../middlewares/multer.js";

// const router = express.Router();

// // Register
// router.post('/signup',userRegister);

// // Signin
// router.post('/login', userSignin);

// // Logout
// router.get('/logout', userAthmiddleware, userLogout);

// // Profile
// router.get('/profile', userAthmiddleware, userProfile);

// // Update Profile
// router.put('/updateprofile', userAthmiddleware, updateUserProfile);

// export { router as userRouter };