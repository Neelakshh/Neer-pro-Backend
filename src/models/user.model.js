import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            
        },
        fullname: {
            type: String,
            required: true,
            index: true,
            trim: true,
        },
        avatar: {
            type: String, // cloudinary url
            required: true,

        },
        coverImage: {
            type: String, // cloudinary url
            required: true,
        },
        watchHistory: [
            {
                type: Schema.types.ObjectId,
                ref: "Video",
             
            }
        ],

        password: {
            type: String,
            required: [true, 'Passowrd is required'],
        },
        refreshToken: {
            type: String,
            default: null
        },
        
    },
    {
        timestamps: true
    }
)


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordMatch = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    jwt.sign(
        { id: this._id,
          email: this.email,
          username: this.username,
          fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    )

}
userSchema.methods.generateRefreshToken = function () {
     jwt.sign(
        { id: this._id,
       
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
    )
}


export const User = mongoose.model("User", userSchema);