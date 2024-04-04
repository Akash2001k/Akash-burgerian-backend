import mongoose from "mongoose";

const schema = new mongoose.Schema({
    shippingInfo: {
        hNo: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true,
        },
        district:{
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true
        },
        pinCode: {
            type: Number,
            required: true
        },
        phoneNo: {
            type: Number,
            required: true
        }
    },

    orderItem: {
        doubleCheeseBurger: {
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }

        },
        VegCheeseBurgerWithFf: {
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }

        },
        vegitableBurger: {
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }

        },
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    paymentMethod: {
        type: "String",
        enum: ['POD', 'Online'],
        default: "POD"
    },
    paymentInfo: {
        type: mongoose.Schema.ObjectId,
        ref: "Payment"
    },
    paidAt: Date,
    subTotal: {
        type: Number,
        default: 0,
    },
    GST: {
        type: Number,
        default: 0,
    },
    shippingCharges: {
        type: Number,
        default: 0,
    },
    grandTotal: {
        type: Number,
        default: 0,
    },
    orderStatus: {
        type: String,
        enum: ["Preparing", "Shipped", "Delivered"],
        default: "Preparing"
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    }

})

export const Order = mongoose.model("Order", schema)