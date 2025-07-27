import jwt from "jsonwebtoken"

const isAuth = async(req,res,next) => {
  try {
    const {token} = req.cookies
    if(!token) {
      return res.status(400).json({
        message:"User doesn't have token"
      })
    }

    const verifyToken = await jwt.verify(token,process.env.JWT_SECRET)
    if(!verifyToken){
      return res.status(400).json({
        message:"User doesn't have valid token"
      })
    }
    req.userId = verifyToken.id 
    next()
  } catch (error) {
    return res.status(500).json({
      message:"Is Auth error"
    })
  }
}


export default isAuth