import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.error("Token generation error:", error);
    throw error;
  }
};

export default generateToken;
