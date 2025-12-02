import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { Server } from "socket.io";
import robot from "robotjs";
const app1 =express();
const server=http.createServer(app1);
const io= new Server(server);
app1.use(express.static(path.join(__dirname, "public")));
app1.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
io.on("connection",(socket)=>{
    console.log("client connected");
    socket.on("moveCursor", (data) => {
  
    const pos = robot.getMousePos();
    robot.moveMouse(pos.x + data.x, pos.y + data.y);
  });

 socket.on("typeKey", (data) => {
    console.log(data.key);
    robot.typeString(data.key); 
});

  
    socket.on("pressKey", (data) => {
        robot.keyTap(data.key); 
    });

  socket.on("click", () => {
    robot.mouseClick();
  });

  

 socket.on("rightClick", () => {
    robot.mouseClick("right");
});


 
  socket.on("scroll", (data) => {
    robot.scrollMouse(data.x, data.y);
    
  });

  socket.on("pressArrow", ({ key }) => {
    robot.keyTap(key);
});

 socket.on("pressSpaceKey", () => {
   robot.keyTap("space");
 });

  socket.on("pressbackSpaceKey", () => {
   robot.keyTap("backspace");
 });

 socket.on("pressEsc", () => {
    robot.keyTap("escape");
 });

 socket.on("shiftclick", (data) => {
    robot.keyTap(data.key, "shift");
 });

  socket.on("ctrlclick", (data) => {
    robot.keyTap(data.key, "control");
 });

 socket.on("dragstart", () => {
      robot.mouseToggle("down");
 });

  socket.on("dragstop", () => {
      robot.mouseToggle("up");
 });
  

  socket.on("selectchoice", () => {
    robot.keyTap("printscreen", "shift");
 });

   socket.on("printscreen", () => {
    robot.keyTap("printscreen");
 });

});

 



server.listen(3000,()=>{
     console.log("Server running on http://0.0.0.0:3000");
});
