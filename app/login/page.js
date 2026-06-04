"use client";
import "./global.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function submt() {
    if (!email || !password) return alert("fill the all feilds");
    let res = await fetch(`api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    let Response = await res.json();
    if (Response.success == true) {
        console.log(Response);
      sessionStorage.setItem("token", Response.token);
      sessionStorage.setItem("myId", Response.id);
      sessionStorage.setItem("name", Response.name);
      console.log(sessionStorage.getItem("token"));
      console.log(sessionStorage.getItem("myId"));
      console.log("name",sessionStorage.getItem("name"));
      router.push("/");
    } else {
      alert(Response.message);
    }
  }
  return (
    <>
      <div id="login">
        <div id="inside">
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          ></input>
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          ></input>
          <button onClick={submt}>login</button>
          <p onClick={() => router.push("/register")}>register</p>
        </div>
      </div>
    </>
  );
}
