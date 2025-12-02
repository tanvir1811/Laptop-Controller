const socket = io();
const touchpad = document.getElementById("joystick");
const scroll = document.getElementById("scroll");
const scroll1 = document.getElementById("scroll1");
let input =document.getElementById("input");
let btn =document.getElementById("btn");
let btn2 =document.getElementById("btn2");
let btn3 =document.getElementById("btn3");
let div =document.getElementById("mydiv");
let div2 =document.getElementById("div2");
let up1=document.getElementById("up");
let down1=document.getElementById("down");
let left1=document.getElementById("left");
let right1=document.getElementById("Right");
let backspacebar=document.getElementById("backspace");
let spacebar=document.getElementById("space");
let ctrl1=document.getElementById("ctrl");
let shift1=document.getElementById("shift");
let ESC=document.getElementById("esc");
let Prtsrc=document.getElementById("prtsrc");
let inputkey=document.getElementById("inputkey");
let dragstart=document.getElementById("dragstart");
let dragstop=document.getElementById("dragstop");
let shiftclicked=0;
let ctrlClicked=0;
let lastx = 0;
let lasty = 0;
let touching = false;
let dragmode = false;
let holdTimer = null;
let lastTap=0;
let lastValue = "";

window.onload=()=>{
  div2.style.display="none"
}


btn.addEventListener("click",()=>{
  div.style.display="none";
  div2.style.display="block";
  
})
btn2.addEventListener("click",()=>{
  div.style.display="block";
  div2.style.display="none";
  
})

btn3.addEventListener("click",()=>{
let len =input.value.length
for(let i=0;i<len;i++){
   socket.emit("pressKey", { key: "backspace" });
}
input.value="";
  
})

up1.addEventListener("click",()=>{
 socket.emit("pressArrow", { key: "up" });
})
down1.addEventListener("click",()=>{
 socket.emit("pressArrow", { key: "down" });
})
left1.addEventListener("click",()=>{
 socket.emit("pressArrow", { key: "left" });
})
right1.addEventListener("click",()=>{
 socket.emit("pressArrow", { key: "right" });
})
spacebar.addEventListener("click",()=>{
 socket.emit("pressSpaceKey");
})
backspacebar.addEventListener("click",()=>{
 socket.emit("pressbackSpaceKey");
})

shift1.addEventListener("click",()=>{
  shiftclicked=1;

})

ctrl1.addEventListener("click",()=>{
  ctrlClicked=1;
 
})

ESC.addEventListener("click",()=>{
 socket.emit("pressEsc"); 
})
Prtsrc.addEventListener("click",()=>{
   if(shiftclicked==1){
    socket.emit("selectchoice");
    shiftclicked=0;
   }

   else if(shiftclicked!=1){
    socket.emit("printscreen");
   }
})

dragstart.addEventListener("click",()=>{
  socket.emit("dragstart");
})

dragstop.addEventListener("click",()=>{
  socket.emit("dragstop");
})


inputkey.addEventListener("keydown",(e)=>{
 if(e.key==="Enter"){
  let inputkeyvalue=e.target.value;
     if(inputkeyvalue.length>1){
      alert("More than one key pressed");
       inputkey.value="";
     }
   else if(shiftclicked==1){
           socket.emit("shiftclick", { key: inputkeyvalue });
           shiftclicked=0;
           inputkey.value=""
     }

     else if(ctrlClicked==1){
       socket.emit("ctrlclick", { key: inputkeyvalue });
       inputkey.value=""
       ctrlClicked=0;

     }
 }
})

  input.addEventListener("input", (e) => {
  const currentValue = e.target.value;
  console.log(currentValue);
 
    
    if (currentValue.length > lastValue.length) {
      let difference =(currentValue.length)-lastValue.length;
      const sentence = currentValue.slice(-difference);
        for(let i=0;i<sentence.length;i++){
          const newChar =sentence.charAt(i);
          if(newChar=="~"){
            let myvalue="`";
             socket.emit("shiftclick", { key: myvalue });
          }

        else if(newChar=="!"){
            let myvalue="1";
             socket.emit("shiftclick", { key: myvalue });
          }
          else  if(newChar=="@"){
            let myvalue="2";
             socket.emit("shiftclick", { key: myvalue });
          }

          else  if(newChar=="#"){
            let myvalue="3";
             socket.emit("shiftclick", { key: myvalue });
          }
          else  if(newChar=="$"){
            let myvalue="4";
             socket.emit("shiftclick", { key: myvalue });
          }
          else  if(newChar=="%"){
            let myvalue="5";
             socket.emit("shiftclick", { key: myvalue });
          }
          else  if(newChar=="^"){
            let myvalue="6";
             socket.emit("shiftclick", { key: myvalue });
          }
          else  if(newChar=="&"){
            let myvalue="7";
             socket.emit("shiftclick", { key: myvalue });
          }

          else  if(newChar=="*"){
            let myvalue="8";
             socket.emit("shiftclick", { key: myvalue });
          }
          else  if(newChar=="("){
            let myvalue="9";
             socket.emit("shiftclick", { key: myvalue });
          }
          else  if(newChar==")"){
            let myvalue="0";
             socket.emit("shiftclick", { key: myvalue });
          }
          else  if(newChar=="+"){
            let myvalue="=";
             socket.emit("shiftclick", { key: myvalue });
          }
          else  if(newChar=="_"){
            let myvalue="-";
             socket.emit("shiftclick", { key: myvalue });
          }
          else  if(newChar=="{"){
            let myvalue="[";
             socket.emit("shiftclick", { key: myvalue });
          }
          else  if(newChar=="}"){
            let myvalue="]";
             socket.emit("shiftclick", { key: myvalue });
          }
          else  if(newChar=="|"){
            let myvalue="\\";
             socket.emit("shiftclick", { key: myvalue });
          }
          else  if(newChar==":"){
            let myvalue=";";
             socket.emit("shiftclick", { key: myvalue });
          }

          else  if(newChar=="\""){
            let myvalue="'";
             socket.emit("shiftclick", { key: myvalue });
          }


          else  if(newChar=="<"){
            let myvalue=",";
             socket.emit("shiftclick", { key: myvalue });
          }
          
          else  if(newChar==">"){
            let myvalue=".";
             socket.emit("shiftclick", { key: myvalue });
          }

          else  if(newChar=="?"){
            let myvalue="/";
             socket.emit("shiftclick", { key: myvalue });
          }

          else{
                socket.emit("typeKey", { key: newChar });
          }
              
        }
        
      

    
        
  } else if (currentValue.length < lastValue.length) {

       let deff =lastValue.length-currentValue.length

       if(deff>1){
        for(let i=0;i<deff;i++){
         socket.emit("pressKey", { key: "backspace" });
        }
       }

       else{
        socket.emit("pressKey", { key: "backspace" });
       }
        
        
    }

    lastValue = currentValue;
  });
 

scroll.addEventListener("click",()=>{
    const scrollAmount = 5;
    const newY = lasty + scrollAmount;

    socket.emit("scroll", { x: 0, y: scrollAmount });

    lasty = newY;

})
scroll1.addEventListener("click",()=>{
    const scrollAmount = -5;
    const newY = lasty - scrollAmount;

    socket.emit("scroll", { x: 0, y: scrollAmount });

    lasty = newY;

})




touchpad.addEventListener("touchstart", (e) => {
  touching = true;
  const touch = e.touches[0];

  lastx = touch.clientX;
  lasty = touch.clientY;

  if(e.touches.length===2){
    socket.emit("rightClick");
  }

   


});

touchpad.addEventListener("touchmove", (e) => {
  e.preventDefault();

  if (!touching) return;

  const touch = e.touches[0];

  const dx = touch.clientX - lastx;
  const dy = touch.clientY - lasty;

  lastx = touch.clientX;
  lasty = touch.clientY;

 
  socket.emit("moveCursor", { x: dx, y: dy });
});

touchpad.addEventListener("touchend", () => {

  touching = false;
});


touchpad.addEventListener("click", () => {
 socket.emit("click");
});
