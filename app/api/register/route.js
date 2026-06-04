import DBconnect from "../../../lib/db";
import users from "../../../model/user";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



export async function POST(req) {
  // const body = await req.json();
  try {
    await DBconnect()
    let body = await req.json()
    console.log(body);
    let {name, email, password} = body
    // let userExist, emailExist
    if( await users.findOne({name}))return Response.json({success : false, message : "user already exist with this name"})
    if( await users.findOne({email}))return Response.json({success : false, message : "user already exist with this email"})

    // let exist = await users.find({email}) return Response.json({success : false, message : "user already exist with email"})
    let hash = await bcrypt.hash(password, 10)
    let user = await users.create({name, email, password : hash})
    let token = await jwt.sign({id : user._id},process.env.SIGNATURE,{expiresIn : "1d"})
    console.log(user._id);

    return Response.json({
      success: true,
      token,
      id : user._id,
      name : user.name
    });
  }catch(err){
    return Response.json({success : false, message : err.message})
  }
}