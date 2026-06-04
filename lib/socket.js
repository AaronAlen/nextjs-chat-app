// lib/socket.js

import { io } from "socket.io-client";

export const socket =
  globalThis.socket ??
  io("ws://10.98.183.223:5000");

if (!globalThis.socket) {
  globalThis.socket = socket;
}