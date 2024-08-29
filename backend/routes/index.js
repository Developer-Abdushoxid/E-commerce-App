import express from "express";
import userSignUpController from "../controller/userSignUp.js"
import userSignInController from "../controller/userSignIn.js";
import userDetailsController from "../controller/userDetails.js";
import authToken from "../middleware/authToken.js"
import userLogout from "../controller/userLogout.js";



const router = express.Router();

router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout", userLogout)



export default router;