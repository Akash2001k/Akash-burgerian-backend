import ErrorHandler from "../Utils/ErrorHandler.js";

export const isAuthenticated = (req,res,next) =>{
    const token = req.cookies;

    if(!token){
       return next (new ErrorHandler("Not Logged In",401))
    }
    next()
}


export const authorizeAdmin = (req,res,next) =>{

    if(req.user.role !== "admin"){
       return next (new ErrorHandler("Only Admin Allowed",405))
    }
    next();
}