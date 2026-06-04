"use client";
import React, { useEffect, useRef, useState } from "react";
import "./msgTab.css";

import { socket } from "@/lib/socket";
import { set } from "mongoose";
// import User from "./User";

const MsgTab = ({dataId, userlist, onClick}) => {
  
  let scroll = useRef(null)

  
  
  
  const [user, setUser] = useState(null);
  const [online, setOnline] = useState([]);
  const [msg, setMsg] = useState("");
  // const [messages, setMessages] = useState([]);
  const [profile, setProfile] = useState({});
  // let currentMsg
  console.log(profile);
  
  
  const name = sessionStorage.getItem("name");

  useEffect(() => {
  if (!name || name == undefined || name == "undefined" || name == "null") return;

  console.log("registering:", name);
  socket.emit("register", name);
}, [name]);
  
  useEffect(()=>{
    const myId = sessionStorage.getItem("myId");
    let users= {}
    userlist?.forEach(value=>users[value.name] = [])
    console.log(users);
    setProfile(users)
  },[userlist])
  
  useEffect(() => {
    
      scroll.current.scrollTop = scroll.current.scrollHeight
  
  socket.on("connect", () => {
      });

      

      // if(name)socket.emit("register", name);

      socket.on("online-users", (data) => {
        setOnline(data);
      });

      socket.on("receive-message", (msgs) => {
        
      setProfile(p=>({...p,[msgs.senderId] : [...(p[msgs.senderId] || []),{sender : msgs.senderId, content : msgs.text, who : "you"}]}))
      if(scroll.current){
        scroll.current.scrollTo({
        top: scroll.current.scrollHeight,
        behavior: "smooth",
        });
      }

    });
      
    return () => {
      socket.off("receive-message");
    };
  }, []);

  
  
  function submt() {

    socket.emit("send-message", {
      senderId: name,
      receiverId: dataId,
      text: msg,
    });
    let msges = profile[dataId]
    
    setProfile(p=>({...p,[dataId] : [...msges,{recever : dataId, content : msg, who : "me"}]}))
    if(scroll.current){
      scroll.current.scrollTo({
      top: scroll.current.scrollHeight,
      behavior: "smooth",
      });
    }
    setMsg("")
  }

useEffect(() => {
  if (!scroll.current) return;

  if(scroll.current){
    scroll.current.scrollTo({
    top: scroll.current.scrollHeight,
    behavior: "smooth",
    });
  }
}, [profile,dataId]);
    
  
  
  return (
    <div id="msgTab">
      <div id="profile">
        <img src="" alt="" />
        <h1>{dataId}</h1>
        <button onClick={onClick} >back</button>
      </div>
      <div ref={scroll} id="messages">
        <div className="msg me"><p className="m">hi</p></div>
        <div className="msg you"><p className="m">hello</p></div>
        <div className="msg me"><p className="m">goodmorning</p></div>
        <div className="msg you"><p className="m">goodnight</p></div>
        <div className="msg me"><p className="m">sleeping</p></div>
        <div className="msg me"><p className="m">hi</p></div>
        <div className="msg you"><p className="m">hello</p></div>
        <div className="msg me"><p className="m">goodmorning</p></div>
        <div className="msg you"><p className="m">goodnight</p></div>
        <div className="msg me"><p className="m">sleeping</p></div>
        <div className="msg me"><p className="m">hi</p></div>
        <div className="msg you"><p className="m">hello</p></div>
        <div className="msg me"><p className="m">goodmorning</p></div>
        <div className="msg you"><p className="m">goodnight</p></div>
        <div className="msg me"><p className="m">sleeping</p></div>
        <div className="msg me"><p className="m">hi</p></div>
        <div className="msg you"><p className="m">hello</p></div>
        <div className="msg me"><p className="m">goodmorning</p></div>
        <div className="msg you"><p className="m">goodnight</p></div>
        <div className="msg me"><p className="m">sleeping</p></div>
        <div className="msg me"><p className="m">hi</p></div>
        <div className="msg you"><p className="m">hello</p></div>
        <div className="msg me"><p className="m">goodmorning</p></div>
        <div className="msg you"><p className="m">goodnight</p></div>
        <div className="msg me"><p className="m">sleeping</p></div>
        <div className="msg me"><p className="m">hi</p></div>
        <div className="msg you"><p className="m">hello</p></div>
        <div className="msg me"><p className="m">goodmorning</p></div>
        <div className="msg you"><p className="m">goodnight</p></div>
        <div className="msg me"><p className="m">sleeping</p></div>
          
          {
            profile?.[dataId]?.map((value,index)=>(
              <div key={index} className={`msg ${value.who}`}><p className={"m"}>{value.content}</p></div>
            ))  
          }
      </div>
      <div id="sendDiv">
    <input id="inputBox" value={msg} onChange={(e) => {setMsg(e.target.value)}} type="text"/>
        <button id="sendBtn" onClick={submt}>send</button>
      </div>
    </div>
  );
};

export default MsgTab;
