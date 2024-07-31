import jwt from "jsonwebtoken";
import {User} from "../models/users.js";
import bcrypt from 'bcrypt';
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllUsers = async(req, res, next) => {
 try {
  const users = await User.find({})
  res.status(201).json({
    success:true,
    users,
  })
 } catch (error) {
  next(error)
 }
};

export const register = async(req, res, next) =>{
  try {
    const {name, email, password} = req.body;

  let user = await User.findOne({email});
  if(user) return next(new ErrorHandler("User Already Exist",404));
  

  const hashedPassword = await bcrypt.hash(password, 10);

user = await User.create({name, email, password:hashedPassword})

sendCookie(user,res,"Registered Successfully", 201)
  } catch (error) {
    next(error)
  }
  

}

export const login = async(req, res, next) => {
   try {
    const {email, password} = req.body;
    const user = await User.findOne({email}).select("+password")


    if(!user) return next(new ErrorHandler("Invalid Email or Password",404));

  

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) return next(new ErrorHandler("Invalid Email or Password",404));

      sendCookie(user, res, `Welcome back, ${user.name}`, 200)
   } catch (error) {
    next(error)
   }
}
export const getUserDetails = async(req, res, next) => {

  res.status(200).json({
    success: true,
    user: req.user,
  });
 
}

export const logout = (req, res, next) => {
 
  res
  .status(200)
  .cookie("token", "", {
    expires: new Date(Date.now()),
    sameSite: process.env.NODE_ENV === "Development" ? "lax":"none",
    secure:process.env.NODE_ENV === "Development" ? false: true,
  })
  .json({
    success: true,
    user: req.user,
  });
 
};

