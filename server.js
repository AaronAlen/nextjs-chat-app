import { createServer } from "http";
import { Server } from "socket.io";

const server = createServer();

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

const onlineUsers = new Map();

io.on("connection", (socket) => {

    console.log("NEW CONNECTION:", socket.id);

  socket.onAny((event, ...args) => {
    console.log("EVENT:", event, args);
  });

  socket.on("register", (myId) => {
    onlineUsers.set(myId, socket.id);

    console.log(onlineUsers);
  });

  

  socket.on("send-message", (data) => {
      console.log("Message received:", data);
          console.log("MESSAGE RECEIVED BY SERVER");


    const receiverSocketId = onlineUsers.get(data.receiverId);

        console.log("Receiver socket:", receiverSocketId);


    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receive-message", {
        senderId: data.senderId,
        text: data.text,
      });
    }
  });
});


server.listen(5000, "0.0.0.0", () => {
  console.log("Server running");
});
