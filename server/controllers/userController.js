import { generateToken } from "../lib/utils";
import User from "../models/user";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  const { fullname, email, password, bio } = req.body;
  try {
    if (!fullname || !email || !password || !bio) {
      return res.json({ success: false, message: "Missing Details" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ success: false, message: "User already exists" });
    }
    //bcrypting the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User.create({
      fullname,
      email,
      password: hashedPassword,
      bio,
    });
    const token = generateToken(newUser._id);
    await newUser.save();
    return res.json({
      success: true,
      userdata: newUser,
      token,
      message: "User created successfully",
    });
  } catch (err) {
    console.log(err.message);
    res.json({
      success: false,
      message: "error.msg",
    });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }
    if (await bcrypt.compare(password, userData.password)) {
      const token = generateToken(userData._id);
      return res.json({
        success: true,
        userdata: userData,
        token,
        message: "User logged in successfully",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.json({
      success: false,
      message: "error.msg",
    });
  }
};
