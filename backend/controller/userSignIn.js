import bcrypt from 'bcryptjs';
import userModel from './../models/userModel.js';
import jwt from "jsonwebtoken";



async function userSignInController(req,res){
    try{
        const { email, password } = req.body

        if(!email){
            throw new Error("Please provide email")
          }
          if(!password){
            throw new Error("Please provide password")
          }

          const user = await userModel.findOne({email})

          if(!user){
            throw new Error("User not found")
          }

          const checkPassword = await bcrypt.compare(password, user.password)

          console.log("checkPassword", checkPassword)
          if(checkPassword){
            const tokenData = {
              _id: user._id,
              email: user.email,

            }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8});
            
            const tokenOption = {
              httpOnly: true,
              secure: true, // HTTPS ulanishlarda 'true' dan foydalaning, aks holda developmentda `false` ga o'zgartiring.
              sameSite: 'Lax' // Cookie brauzerlarida ishlashini ta'minlash uchun
            }
            res.cookie("token",token,tokenOption).json({
              message: "Login successfully",
              data: token,
              success: true,
              error: false
            })

          }else{
            throw new Error("Please check password")
          }

    }catch(err){
        res.json({
            message:  err.message || err,
            error: true,
            success: false,
          })
    }
};

export default userSignInController;