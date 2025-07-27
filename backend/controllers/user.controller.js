import User from "../models/user.model.js"

export const getCurrentUser = async(req,res)=> {
  try {
    const id = req.userId
    const user = await User.findById(id).select("-password");
    if(!user){
      return res.status(400).json({
        message:"user does not found"
      })
    }
    // console.log(id);

    return res.status(200).json(user)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message:"getting user failed "
    })
  }
}