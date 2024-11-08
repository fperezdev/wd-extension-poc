importScripts("socket.io-client.js");

let socket;

socket = io("http://localhost:3001", { transports: ["websocket"] });

socket.on("message", (message) => {
  console.log("wd-ext Received message:", message);
});
