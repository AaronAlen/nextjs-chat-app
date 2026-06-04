"use client";

import User from "@/components/User";
import { useRouter } from "next/navigation";
import "./globals.css"
import MsgTab from "@/components/MsgTab";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";


export default function Home() {
  const router = useRouter()

    const [mobile, setMobile] = useState(false);
    const [isMobile, setIsMobile] = useState(true);
  
  const [users, setUsers] = useState(null)
  const [id, setId] = useState(null)

  // const [myId, setMyId] = useState(null);

// useEffect(() => {
//   const idd = sessionStorage.getItem("myId");
//   setMyId(idd);
// }, []);

let myId = sessionStorage.getItem("myId")
  
if (!sessionStorage.getItem("token")) {
  router.push("/login");
  return;
}
  useEffect(() => {


  }, []);
  
  // useEffect(()=>{
  //   // console.log(id);
  // },[id])

  const [online, setOnline] = useState([]);

  useEffect(() => {
    async function loaddata(){
      let res = await fetch(`api/getUsers`)
      let data = await res.json()
      console.log(data.datas);
      setUsers(data.datas)
      console.log("myId", myId);
      const value = data.datas?.find((value)=>myId != value._id)
      setId(value?.name)
      // sessionStorage.setItem("name",value.name);
      console.log("names",sessionStorage.getItem("name"));
    }
    loaddata()

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });


    // socket.emit("register", users?.find((value)=>myId == value._id)).name;

    socket.on("online-users", (data) => {
      setOnline(data);
      console.log(data);
    });

    socket.on("receive-message", (msg) => {
      console.log(msg);
    });

    return () => {
      // socket.disconnect();
    };
  }, []);



  return (
   <>
    {/* <h1 onClick={()=>router.push("/login")}>hello</h1> */}

    <div id="homeBox">
    {isMobile ? (!mobile ? (<div id="users">
          {
            users?.filter(value=>value._id != myId).map((value,index)=>(
           <User  key={index} data={value} onClick={()=>{setId(value.name);setMobile(true)}} />
            ))
          }     
      </div>) :
      (<MsgTab dataId={id} userlist = {users?.filter((v)=>v._id != myId)} onClick={()=>setMobile(false)} />))
      :(
        <>
          <div id="users">
            {
              users?.filter(value=>value._id != myId).map((value,index)=>(
            <User  key={index} data={value} onClick={()=>{setId(value.name);setMobile(true)}} />
              ))
            }     
        </div>
        <MsgTab dataId={id} userlist = {users?.filter((v)=>v._id != myId)} onClick={()=>setMobile(false)} />  
        </>
      )}
   </div>

   </>
  )
}
