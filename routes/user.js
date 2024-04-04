import express from "express";
import passport from "passport";
import { myProfile,logout,getAdminUsers } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router()

router.get('/googlelogin', passport.authenticate("google", {
    scope: ["profile"],
})
)

router.get('/login',
//  passport.authenticate("google", {
//     scope: ["profile"],
//     successRedirect: process.env.FRONTEND_URL
// })

passport.authenticate("google"),
(req,res,next) => {
    res.send("Logged In")
}
)
router.get('/me',isAuthenticated,myProfile)

router.get('/logout',logout)

// Admin Routes
router.get('/admin/users',isAuthenticated,getAdminUsers)



export default router