import express from "express";
import { userRegister, userSignin, userLogout, userProfile, updateUserProfile } from "../controllers/userControllers.js";
import {  userAthmiddleware } from "../middlewares/userAuth.js"; 

import { generatePaymentIntent } from "../controllers/payment.js";
import { createOrder, fetchOrderDetails } from "../controllers/orderController.js";
import imageUpload from "../middlewares/ImageUpload/imageUpload.js";
import { getAllUsers } from "../controllers/userControllers.js";
import { adminAuthMiddleware } from "../middlewares/AdminAuth.js";

const router = express.Router();
router.use((req, res, next)=>{
    console.log(req.path)
    console.log(req.method)
    next()
})

// Register
router.post('/signup',imageUpload, userRegister);

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

router.get("/users", adminAuthMiddleware, getAllUsers);



export {router as userRouter};

