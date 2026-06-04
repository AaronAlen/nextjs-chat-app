"use client"
import "./globals.css"
import { useState } from "react"
import {useRouter} from  "next/navigation"

export default function Register() {

    const router = useRouter() 
    const [data, setData] = useState(null)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function submt(){
        if(!name || !email || !password)return alert("fill the all feilds")
        
        let res = await fetch(`api/register`,{
            method : "post",
            headers : {
            "Content-Type" : "application/json",
            },
            body : JSON.stringify({name, email, password})
        })

        let msg = await res.json()
         setData(msg)
         console.log(msg);
         if(msg.success == true){
            sessionStorage.setItem("token",msg.token)
            sessionStorage.setItem("myId",msg.id)
            sessionStorage.setItem("myId",msg.name)
            console.log(sessionStorage.getItem("token"));
            console.log(sessionStorage.getItem("myId"));
            router.push("/")
         }
         else{
            alert(msg.message)
         }
    }

  return (
   <>
    <div id="login">
        <div id="inside">
            <input type="text" onChange={(e)=>setName(e.target.value)} placeholder="user name"></input>
            <input type="text" onChange={(e)=>setEmail(e.target.value)} placeholder="email"></input>
            <input type="text" onChange={(e)=>setPassword(e.target.value)} placeholder="password"></input>
            <button onClick={submt}>register</button>
            <h1>{data ? data.user : ""}</h1>
            <p onClick={()=>router.push("/")} >home</p>
        </div>
    </div>
   </>
  )
}



// let num = [10]

// function array(nums){
//     let arr 
//     for(let i = 0; i <= nums.length-1; i++){
//         arr = nums[i] + nums[i+1] 
//         console.log(arr);
//     }
//     return arr
// }
// console.log(array([10,20,30,40,50]));

