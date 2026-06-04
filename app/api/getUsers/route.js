import DBconnect from "../../../lib/db"
import users from "../../../model/user"

export async function GET(req) {
    await DBconnect()
    let datas = await users.find({},{name :1,_id :1})
    console.log(datas);
    return Response.json({success : true, datas})
    
}