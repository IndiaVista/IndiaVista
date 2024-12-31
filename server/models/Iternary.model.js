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
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});

export const Iternary=mongoose.model("Iternary",IternarySchema)