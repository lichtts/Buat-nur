/*====================================
  ELEMENT
====================================*/

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const nextBtn = document.getElementById("nextBtn");
const kepoBtn = document.getElementById("kepoBtn");

const story = document.getElementById("story");

const spinBtn = document.getElementById("spinBtn");
const wheel = document.getElementById("wheel");
const result = document.getElementById("result");

let currentRotation = 0;


/*====================================
  CHANGE PAGE
====================================*/

function showPage(page){

document.querySelectorAll(".page").forEach(p=>{

p.classList.remove("active");

});

page.classList.add("active");

}


/*====================================
  BUTTON KABUR
====================================*/

function moveButton(button){

const card = button.parentElement.parentElement;

const cardWidth = card.clientWidth;

const cardHeight = card.clientHeight;

const buttonWidth = button.offsetWidth;

const buttonHeight = button.offsetHeight;

let x;
let y;

do{

x=Math.random()*(cardWidth-buttonWidth-40)+20;

y=Math.random()*(cardHeight-buttonHeight-120)+70;

}
while(

Math.abs(x-60)<150 &&
Math.abs(y-220)<90

);

button.style.position="absolute";

button.style.left=x+"px";

button.style.top=y+"px";

}


/*====================================
  PAGE 1
====================================*/

noBtn.addEventListener("mouseenter",()=>{

moveButton(noBtn);

});

noBtn.addEventListener("touchstart",(e)=>{

e.preventDefault();

moveButton(noBtn);

});

yesBtn.onclick=()=>{

showPage(page2);

};


/*====================================
  PAGE 2
====================================*/

kepoBtn.addEventListener("mouseenter",()=>{

moveButton(kepoBtn);

});

kepoBtn.addEventListener("touchstart",(e)=>{

e.preventDefault();

moveButton(kepoBtn);

});

nextBtn.onclick=()=>{

if(story.value.trim()==""){

alert("Isi dulu dong 😚");

return;

}

showPage(page3);

};
/*====================================
  SPIN WHEEL
====================================*/

function randomNumber(){

    // 5% peluang mendapat 35-50

    if(Math.random()<0.05){

        return Math.floor(Math.random()*16)+35;

    }

    //95%

    return Math.floor(Math.random()*34)+1;

}



function getMessage(number){

    if(number<=15){

        return "Yah bau belum mandi berarti 😂";

    }

    if(number<=26){

        return "Lumayan lah ya 😆";

    }

    if(number<=34){

        return "Anjay hoki juga kamu 🔥";

    }

    return "Buset hoki bet 🤯";

}



spinBtn.onclick=function(){

spinBtn.disabled=true;

const angka=randomNumber();

const pesan=getMessage(angka);

currentRotation+=360*6+(angka*7);

wheel.style.transform="rotate("+currentRotation+"deg)";

setTimeout(()=>{

result.innerHTML=

"<h2>"+angka+"</h2><br>"+pesan;

sendToGoogleForm(

story.value,

angka

);

spinBtn.innerHTML="Selesai ❤️";

},4200);

};



/*====================================
 GOOGLE FORM
====================================*/

function sendToGoogleForm(storyText,spin){

const url=

"https://docs.google.com/forms/d/e/1FAIpQLSfYCJYg8grx-55pUmXQ0wp5ssZhhIDm4tVdSFvjXnuKnkf2xw/formResponse";

const formData=new FormData();

formData.append(

"entry.940726459",

storyText

);

formData.append(

"entry.475853731",

spin

);

fetch(url,{

method:"POST",

mode:"no-cors",

body:formData

});

}



/*====================================
  LEAF
====================================*/

const bg=document.querySelector(".background");

for(let i=0;i<4;i++){

const leaf=document.createElement("span");

leaf.style.left=Math.random()*100+"%";

leaf.style.animationDelay=

Math.random()*10+"s";

leaf.style.animationDuration=

14+Math.random()*10+"s";

bg.appendChild(leaf);

}
