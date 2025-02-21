import e from "express";

import { userRouter } from "./userRoutes.js";
import {reviewRouter} from "./reviewRoutes.js";
import {restaurantRouter}from "./resturantRoutes.js"
import {ownerRouter}from "./ownerRoutes.js"
import {orderedDishesRouter}from "./ordersDishesRoutes.js"
import {dishesRouter}from "./dishesRoutes.js"
import {couponRouter}from "./couponRoutes.js"
import {cartRouter}from "./cartRoutes.js"
import {adminRouter}from "./adminRoutes.js"
import morgan from "morgan";

const router = e.Router()



router.use('/user',userRouter)
router.use("/review",reviewRouter)
router.use("/resturant",restaurantRouter)
router.use("/owner",ownerRouter)
router.use("/orderDishes",orderedDishesRouter)
router.use("/dishes",dishesRouter)
router.use("/coupon",couponRouter)
router.use("/cart",cartRouter)
router.use("/admin",adminRouter)

export{router as apiRouter};