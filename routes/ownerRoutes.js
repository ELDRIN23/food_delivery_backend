import e from "express";
import {restaurantownerAuth}from "../middlewares/ownerAuth.js"
import {
    restaurantownerRegister,
    restaurantownerLogin,
    restaurantownerProfile,
    restaurantownerLogout,
    updateRestaurantownerProfile
} from "../controllers/ownerControllers.js"


const router = e.Router();

//Register
router.post('/register', restaurantownerRegister);

//Signin
router.put('/login',restaurantownerLogin);

//Logout
router.put('/logout', restaurantownerAuth,restaurantownerLogout);

//Profile
router.get('/profile',  restaurantownerAuth, restaurantownerProfile)


//Updateprofile
router.get('/updateprofile', restaurantownerAuth, updateRestaurantownerProfile );


export { router as ownerRouter };

