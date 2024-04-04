import express from "express";
import { authorizeAdmin, isAuthenticated } from "../middleware/auth.js";
import { getOrderDetails, getMyOrders, placeOrder, getAdminOrders, processOrder,} from "../controllers/order.js";

const router = express.Router()

router.post("/createorder", isAuthenticated, placeOrder);

// router.post("/createorderonline",placeOrderOnline)

router.get("/myorders", isAuthenticated,getMyOrders)

router.get("/order/:id", isAuthenticated,getOrderDetails)

//Add Admin Middleware
router.get("/admin/orders", isAuthenticated, getAdminOrders)

router.get("/admin/order/:id",isAuthenticated, processOrder)

export default router