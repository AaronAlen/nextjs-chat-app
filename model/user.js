import mongoose from "mongoose";


let user = new mongoose.Schema({
    name : {
        type : String,
        unique : true
    },
    email : {
        type : String,
        unique : true
    },
    password : String
})

let users = mongoose.models.users || mongoose.model("users", user)

export default users