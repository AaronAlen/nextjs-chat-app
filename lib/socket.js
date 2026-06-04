// lib/socket.js

import { io } from "socket.io-client";

export const socket =
  globalThis.socket ??
  io("https://socket-server-b7yu.onrender.com");

if (!globalThis.socket) {
  globalThis.socket = socket;
}