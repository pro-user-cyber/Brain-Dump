// POMODORO

let time = 1500;
let timer;

function startTimer(){
clearInterval(timer);

timer = setInterval(()=>{
time--;

let minutes = Math.floor(time/60);
let seconds = time%60;

document.getElementById("timer").innerText =
`${minutes}:${seconds.toString().padStart(2,'0')}`;

if(time<=0){
clearInterval(timer);
alert("Focus session finished. Take a break.");
}

},1000);
}

function resetTimer(){
clearInterval(timer);
time = 1500;
document.getElementById("timer").innerText="25:00";
}


// CALCULATOR

function calculate(){
let input=document.getElementById("calcInput").value;

try{
let result=eval(input);
document.getElementById("calcResult").innerText=result;
}
catch{
document.getElementById("calcResult").innerText="Invalid expression";
}
}


// CHATBOT

async function sendMessage(){

let input=document.getElementById("chatInput");
let message=input.value;

if(!message) return;

let chatBox=document.getElementById("chatBox");

chatBox.innerHTML += `<p><b>You:</b> ${message}</p>`;

input.value="";

let response=await fetch("http://localhost:3000/chat",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({message})
});

let data=await response.json();

let reply=data.choices[0].message.content;

chatBox.innerHTML += `<p><b>AI:</b> ${reply}</p>`;

chatBox.scrollTop=chatBox.scrollHeight;
}