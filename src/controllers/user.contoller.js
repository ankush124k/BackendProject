import {asyncHandler} from "../utlis/asyncHandler.js"
import {ApiError} from '../utlis/ApiError.js'
import {User} from '../models/user.model.js'
import {uploadOnCloudinary} from '../utlis/cloudinary.js'
import {ApiResponse} from '../utlis/ApiResponse.js'

const registerUser = asyncHandler(async(req,res)=>{
    //email,password--dp create--store info save

    //get user details from frontend validation -not empty
    //check if user already exists : email,username
    //check for images ,check for avatar 
    //upload them to cloudinary ,avatar
    //create user object - create entry in db 
    //remove password and refresh token field form response 
    //check for user creation
    //return response 

    const {fullName,email,username,password}=req.body;
    
    //validation

    if(
        [fullName,email,username,password].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(400,"All fiels are required")
    }

    const existedUser = User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"user with email or username already exists")
    }

    //checking for mandatory fields

    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverImageLocalPath=req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"avatar file is reqiured")
    }

    const avatar=await uploadOnCloudinary(avatarLocalPath)
    const coverImage=await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"avatar file is required")
    }

    User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url||"",
        email,
        password,
        username:username.toLowerCase()
    })

    const createUser= await User.findById(User._id).select(
        "-password -refreshToken"
    )

    if(!createUser){
        throw new ApiError(500,"something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200,createUser,"User registeredd successfully")
    )



})

export {registerUser};