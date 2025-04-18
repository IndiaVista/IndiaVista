import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    // username: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   lowercase: true,
    //   trim: true,
    //   index: true,
    // },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    profile_pic: {
      type: String, // Cloudinary URL or image path
    },
    state: {
      type: String,
      trim: true,
      default: "", // Optional initially
    },
    city: {
      type: String,
      trim: true,
      default: "", // Optional initially
    },
    landmark: {
      type: String,
      trim: true,
      default: "", // Optional
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
    token: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    savedSites: [
      {
        type: Number
      }
    ]     
  },
  { timestamps: true }
);

//middleware in mongoose
userSchema.pre("save", async function (next) {
  //save is triggered whenever we create or update any model
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// userSchema.methods.isPasswordCorrect = async function (password) {
//   console.log(password +"input")
//   console.log(this.password +"model")
//   return await bcrypt.compare(password, this.password);
// };

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
