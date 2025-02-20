import e from "express";
import {restaurantAdminRegister,restaurantAdminLogin,restaurantAdminProfile,restaurantAdminLogout,updateRestaurantAdminProfile}from "../controllers/adminControllers.js"
import {adminAuthMiddleware}from "../middlewares/AdminAuth.js"
import { fetchDishesForAdmin } from "../controllers/adminDishesController.js";

const router = e.Router();


//Register
router.post('/register', restaurantAdminRegister);

//Signin
router.post('/signin', restaurantAdminLogin);

//Logout
router.get('/logout',adminAuthMiddleware,  restaurantAdminLogout);

//Profile
router.get('/profile',adminAuthMiddleware, restaurantAdminProfile);

//Updateprofile
router.get('/updateprofile',adminAuthMiddleware,updateRestaurantAdminProfile );

router.get("/fetch-dishes",adminAuthMiddleware,fetchDishesForAdmin)

export { router as adminRouter };
