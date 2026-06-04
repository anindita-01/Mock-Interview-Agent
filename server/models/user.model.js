import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        lowercase:true,
        trim:true,
        unique:true,
        sparse:true
    },
    passwordHash:{
        type:String,
        select:false
    },
    credits:{
        type:Number,
        default:100
    }

}, {
    timestamps:true,
    toJSON: {
        transform: (doc, ret) => {
            delete ret.passwordHash
            return ret
        }
    }
})

const User = mongoose.model("User" , userSchema)

export default User
