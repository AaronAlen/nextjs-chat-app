"use client";

import User from "@/components/User";
import { useRouter } from "next/navigation";
import "./globals.css";
import MsgTab from "@/components/MsgTab";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";

type UserType = {
  _id: string;
  name: string;
};

export default function Home() {
  const router = useRouter();

  const [mobile, setMobile] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const [users, setUsers] = useState<UserType[]>([]);
  const [id, setId] = useState<string | null>(null);
  const [myId, setMyId] = useState<string | null>(null);

  const [online, setOnline] = useState<string[]>([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    setMyId(sessionStorage.getItem("myId"));
  }, [router]);

  useEffect(() => {
    if (!myId) return;

    async function loaddata() {
      const res = await fetch("/api/getUsers");
      const data: { datas: UserType[] } = await res.json();

      setUsers(data.datas);

      const value = data.datas.find(
        (value: UserType) => value._id !== myId
      );

      setId(value?.name ?? null);
    }

    loaddata();

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    return () => {
      socket.off("connect");
    };
  }, [myId]);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 500);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  if (!myId) {
    return <div>Loading...</div>;
  }

  return (
    <div id="homeBox">
      {isMobile ? (
        !mobile ? (
          <div id="users">
            {users
              .filter((value) => value._id !== myId)
              .map((value, index) => (
                <User
                  key={index}
                  data={value}
                  onClick={() => {
                    setId(value.name);
                    setMobile(true);
                  }}
                />
              ))}
          </div>
        ) : (
          id && (
            <MsgTab
              dataId={id}
              userlist={users.filter((v) => v._id !== myId)}
              onClick={() => setMobile(false)}
            />
          )
        )
      ) : (
        <>
          <div id="users">
            {users
              .filter((value) => value._id !== myId)
              .map((value, index) => (
                <User
                  key={index}
                  data={value}
                  onClick={() => {
                    setId(value.name);
                    setMobile(true);
                  }}
                />
              ))}
          </div>

          {id && (
            <MsgTab
              dataId={id}
              userlist={users.filter((v) => v._id !== myId)}
              onClick={() => setMobile(false)}
            />
          )}
        </>
      )}
    </div>
  );
}