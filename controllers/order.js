import { Order } from "../Models/Order.js";
import ErrorHandler from "../Utils/ErrorHandler.js";

// ===========================================================================
export const placeOrder = async (req, res, next) => {
    try {
        const {
            shippingInfo,
            orderItem,
            paymentMethod,
            subTotal,
            GST,
            shippingCharges,
            grandTotal
        } = req.body;

        const user = req.user._id;

        const orderOptions = {
            shippingInfo,
            orderItem,
            paymentMethod,
            subTotal,
            GST,
            shippingCharges,
            grandTotal,
            user,
        };
        await Order.create(orderOptions);

        res.status(201).json({
            sucess: true,
            message: "Order placed Successfully via Pay on Delivery"
        })

    } catch (error) {
        res.send(error)
    }
}


// // ===========================================================================
// export const placeOrderOnline = async (req, res, next) => {
//     try {
//        
//     } catch (error) {
//         res.send(error)
//     }
// }


// ==========================================================================
export const getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({
            user: req.user._id
        }).populate("user", "name")


        res.status(200).json({ success: true, orders })


    } catch (error) {
        res.send(error)
    }
}

// ==============================================================================
export const getOrderDetails = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name")

        if (!order) return next(new ErrorHandler("Invalid Order Id", 404))

        res.send({
            sucess: true,
            order
        })

    } catch (error) {
        res.send(error)
    }
}

// ==============================================================================
export const getAdminOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().populate("user", "name")

        res.status(200).json({ success: true, orders })


    } catch (error) {
        res.send(error)
    }
}

// ==================================================================================

export const processOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id)

        if (!order) return next(new ErrorHandler("Invalid Order Id", 404))

        if(order.orderStatus==="Preparing") order.orderStatus="Shipped";

        else if(order.orderStatus === "Shipped"){
            order.orderStatus = "Delivered";
            order.deliveredAt = new Date(Date.now());
        } 
        else if(order.orderStatus === "Delivered"){
            return next(new ErrorHandler("Food Already Delivered",400))
        }

        await order.save();

        
        res.status(200).json({ success: true, message:"Status Updated Successfully" })

    } catch (error) {
        res.send(error)
    }
}