
import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { User } from "../models/user.model.js"
import mailSender from "../utils/mailSender.js"
import passwordUpdated from "../mail/templates/passwordUpdated.js"


// require("dotenv").config()

const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId)

        if (!user) {
            throw new ApiError(404, "User not found");
        }
    
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
    
        await user.save({validateBeforeSave: false})
    
        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const registerUser = asyncHandler( async(req, res) => {
    const {fullName, email, password} = req.body
    console.log(fullName)
    console.log(email)
    console.log(password)
    if(
        [fullName, email, password].some((field) => 
            field?.trim() === ""
        )
    ){
        throw new ApiError(400,"All fiels is required")
    }
    // const existedUser = User.findOne({email})

    // if(existedUser){
    //     throw new ApiError(409, "User with email or username already exist")
    // }

    const user = await User.create({
        fullName,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
});

const loginUser = asyncHandler( async(req, res) => {
    const {email, password} = req.body

    if(!email){
        throw new ApiError(400, "email is required")
    }

    const user = await User.findOne({email})

    if(!user){
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401, "Password incorrect")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).
    select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged in successfully"
        )
    )
});

const logoutUser = asyncHandler( async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken : 1
            }
        },
        {
            new : true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json( new ApiResponse(200,{},"User logged Out"))
})

const refreshAcessToken = asyncHandler( async(req, res) => {
    const incommingRefreshToken = req.cookies.refreshtoken || req.body.refreshToken

    if(!incommingRefreshToken){
        throw new ApiError(401, "Unautoried request")
    }

    try {
        const decodedToken = jwt.verify(incommingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        
        const user = await User.findById(decodedToken?._id)

        if(!user){
            throw new ApiError(401, "Invalid refresh token")
        }
    
        // match incommingRefreshToken and user meka refreshToken
        if(incommingRefreshToken != user?.refreshToken){
            throw new ApiError(401, "Refresh token is expired or used")
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefreshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",newRefreshToken,options)
        .json(
            new ApiResponse(
                200,
                {
                     accessToken, refreshToken: newRefreshToken
                },
                "Access token refreshed"
            )
        )

    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid refresh token")
    }
});

const changePassword = async (req, res) => {
    try {
      // Get user data from req.user
      const { email, newPassword,confirmNewPassword} = req.body;
  console.log(confirmNewPassword)
  console.log(newPassword)
    // Validate inputs
    if (!email || !confirmNewPassword || !newPassword) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Find the user by email
    const userDetails = await User.findOne({ email });
    if (!userDetails) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
  
      // Validate old password
    
      if (!(newPassword==confirmNewPassword)) {
        // If old password does not match, return a 401 (Unauthorized) error
        return res
          .status(401)
          .json({ success: false, message: "The password is incorrect" })
      }

      const previouspass=userDetails.password
      console.log("prev pass:"+ previouspass)
  
      // Update password
      await userDetails.updateOne(
        {
            password:newPassword
        }
      )
      
      // Send notification email
      try {
        const emailResponse = await mailSender(
            userDetails.email,
          "Password for your account has been updated",
          passwordUpdated(
            userDetails.email,
            `Password updated successfully for ${userDetails.firstName} ${userDetails.lastName}`
          )
        )
        // console.log("Email sent successfully:", emailResponse.response)
      } catch (error) {
        // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
        console.error("Error occurred while sending email:", error)
        return res.status(500).json({
          success: false,
          message: "Error occurred while sending email",
          error: error.message,
        })
      }
  
      // Return success response
      return res
        .status(200)
        .json({ success: true, message: "Password updated successfully" })
    } catch (error) {
      // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while updating password:", error)
      return res.status(500).json({
        success: false,
        message: "Error occurred while updating password",
        error: error.message,
      })
    }
  }
export {registerUser, loginUser, logoutUser, refreshAcessToken,changePassword}