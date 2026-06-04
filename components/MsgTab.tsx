"use client";

import React, { useEffect, useRef, useState } from "react";
import "./msgTab.css";
import { socket } from "@/lib/socket";

type Message = {
  sender?: string;
  recever?: string;
  content: string;
  who: string;
};

type Profile = {
  [key: string]: Message[];
};

type User = {
  _id?: string;
  name: string;
};

type Props = {
  dataId: string;
  userlist: User[];
  onClick: () => void;
};

const MsgTab = ({ dataId, userlist, onClick }: Props) => {
  const scroll = useRef<HTMLDivElement>(null);

  const [user, setUser] = useState<User | null>(null);
  const [online, setOnline] = useState<string[]>([]);
  const [msg, setMsg] = useState<string>("");
  const [profile, setProfile] = useState<Profile>({});

  const name =
    typeof window !== "undefined"
      ? sessionStorage.getItem("name")
      : null;

  useEffect(() => {
    if (
      !name ||
      name === "undefined" ||
      name === "null"
    ) {
      return;
    }

    socket.emit("register", name);
  }, [name]);

  useEffect(() => {
    const users: Profile = {};

    userlist?.forEach((value: User) => {
      users[value.name] = [];
    });

    setProfile(users);
  }, [userlist]);

  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollTop = scroll.current.scrollHeight;
    }

    socket.on("online-users", (data: string[]) => {
      setOnline(data);
    });

    socket.on(
      "receive-message",
      (msgs: { senderId: string; text: string }) => {
        setProfile((p) => ({
          ...p,
          [msgs.senderId]: [
            ...(p[msgs.senderId] || []),
            {
              sender: msgs.senderId,
              content: msgs.text,
              who: "you",
            },
          ],
        }));

        if (scroll.current) {
          scroll.current.scrollTo({
            top: scroll.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }
    );

    return () => {
      socket.off("receive-message");
      socket.off("online-users");
    };
  }, []);

  function submt(): void {
    socket.emit("send-message", {
      senderId: name,
      receiverId: dataId,
      text: msg,
    });

    const msges = profile[dataId] || [];

    setProfile((p) => ({
      ...p,
      [dataId]: [
        ...msges,
        {
          recever: dataId,
          content: msg,
          who: "me",
        },
      ],
    }));

    if (scroll.current) {
      scroll.current.scrollTo({
        top: scroll.current.scrollHeight,
        behavior: "smooth",
      });
    }

    setMsg("");
  }

  useEffect(() => {
    if (!scroll.current) return;

    scroll.current.scrollTo({
      top: scroll.current.scrollHeight,
      behavior: "smooth",
    });
  }, [profile, dataId]);

  return (
    <div id="msgTab">
      <div id="profile">
        <img src="" alt="" />
        <h1>{dataId}</h1>
        <button onClick={onClick}>back</button>
      </div>

      <div ref={scroll} id="messages">
        <div className="msg me">
          <p className="m">hi</p>
        </div>

        <div className="msg you">
          <p className="m">hello</p>
        </div>

        <div className="msg me">
          <p className="m">goodmorning</p>
        </div>

        <div className="msg you">
          <p className="m">goodnight</p>
        </div>

        <div className="msg me">
          <p className="m">sleeping</p>
        </div>

        {profile[dataId]?.map(
          (value: Message, index: number) => (
            <div
              key={index}
              className={`msg ${value.who}`}
            >
              <p className="m">{value.content}</p>
            </div>
          )
        )}
      </div>

      <div id="sendDiv">
        <input
          id="inputBox"
          value={msg}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement>
          ) => setMsg(e.target.value)}
          type="text"
        />

        <button id="sendBtn" onClick={submt}>
          send
        </button>
      </div>
    </div>
  );
};

export default MsgTab;