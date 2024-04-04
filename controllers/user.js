import { User } from "../Models/User.js"

export const myProfile = (req, res, next) => {
  res.status(200).json(
    {
      success: true,
      user: req.user,
    }
  )
}

export const logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err)

    res.clearCookie("connect.sid")
    res.status(200).json({
      message: "Logged Out",
    })
  })
}

export const getAdminUsers = async (req, res, next) => {
  try {
    const users = await User.find({})
    
    res.status(200).json({success:true,users})

  } catch (error) {
    res.send(error)
  }
}