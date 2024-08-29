import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

async function userSignUpController(req,res){
try{
  const { email, password, name } = req.body

  const user = await userModel.findOne({email})

  console.log("user", user)

  if(user){
    throw new Error("Already user exists.")
  }

  if(!email){
    throw new Error("Please provide email")
  }
  if(!password){
    throw new Error("Please provide password")
  }
  if(!name){
    throw new Error("Please provide name")
  }

  let salt = bcrypt.genSaltSync(10);
  let hashPassword = bcrypt.hashSync(password,salt);

  if(!hashPassword){
    throw new Error("Something is wrong")
  }

  const payload = {
    ...req.body,
    role: "GENERAL",
    password: hashPassword
  }

  const userData = new userModel(payload)
  const savedUser = await userData.save()

  res.status(201).json({
    data: savedUser,
    success: true,
    error: false,
    message: "User created successfully"
  })
}catch(err){
  res.json({
    message:  err.message || err,
    error: true,
    success: false,
  })
}
}


export default userSignUpController;