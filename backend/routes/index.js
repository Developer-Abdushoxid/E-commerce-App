import express from "express";
import userSignUpController from "../controller/userSignUp.js"
import userSignInController from "../controller/userSignIn.js";
import userDetailsController from "../controller/userDetails.js";
import authToken from "../middleware/authToken.js"
import userLogout from "../controller/userLogout.js";
import allUsers from "../controller/allUsers.js";
import updateUser from "../controller/updateUser.js";



const router = express.Router();

router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout", userLogout)


// admin panel
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)


export default router;