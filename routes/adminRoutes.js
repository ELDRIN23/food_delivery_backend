import e from "express";
import {restaurantAdminRegister,restaurantAdminLogin,restaurantAdminProfile,restaurantAdminLogout,updateRestaurantAdminProfile}from "../controllers/adminControllers.js"
import {adminAuthMiddleware}from "../middlewares/AdminAuth.js"

const router = e.Router();


//Register
router.post('/register', restaurantAdminRegister);

//Signin
router.put('/signin', restaurantAdminLogin);

//Logout
router.get('/logout',adminAuthMiddleware,  restaurantAdminLogout);

//Profile
router.get('/profile',adminAuthMiddleware, restaurantAdminProfile);

//Updateprofile
router.get('/updateprofile',adminAuthMiddleware,updateRestaurantAdminProfile );


export { router as adminRouter };
