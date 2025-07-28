import generateToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    let { firstName, lastName, userName, email, password } = req.body;

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "email already exists !" });
    }

    const existUsername = await User.findOne({ userName });
    if (existUsername) {
      return res.status(400).json({ message: "UserName already exists !" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    const hashedPassword = await bcrypt.hash(password, 14);

    const newUser = await User.create({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
    });
    console.log(newUser);

    const token = await generateToken(newUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      samesite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser, token });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
    console.log("Duplicate email or username");
  }
    res.status(500).json({ message: "Internal server error" });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist !" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password !" });
    }

    const token = await generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      samesite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
    });
    console.log("user Login : =",user);

    res
      .status(201)
      .json({ message: `${user.userName} login successfully`, user });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};