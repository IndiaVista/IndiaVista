import mongoose,{Schema} from "mongoose";

const IternarySchema = new Schema({
    iternaryName:{
        type:String,
        required:true,
        unique: true,
        trim: true,
    },
    places:{
        type:Array,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true});

export const Iternary=mongoose.model("Iternary",IternarySchema)