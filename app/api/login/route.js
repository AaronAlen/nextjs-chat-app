import bcrypt from "bcrypt"
import users from "../../../model/user"
import jwt from "jsonwebtoken"
import DBconnect from "../../../lib/db";

export async function POST(req) {
    console.log("hi");
    await DBconnect()
    let body = await req.json()
    let user = await users.findOne({email : body.email})
    if(!user)return Response.json({success : false , message : "user not exist"})
    console.log(await bcrypt.compare(body.password,user.password));
    if(! await bcrypt.compare(body.password,user.password))return Response.json({success : false, message : "incorrect password"})
    return Response.json({success : true, token : jwt.sign({id : user._id},process.env.SIGNATURE, {expiresIn : "1d"}), id : user._id, name : user.name})
} 