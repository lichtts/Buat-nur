/*====================================
  ELEMENT
====================================*/
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");
const page4 = document.getElementById("page4");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const nextBtn = document.getElementById("nextBtn");
const kepoBtn = document.getElementById("kepoBtn");
const story = document.getElementById("story");

const lanjutTypeBtn = document.getElementById("lanjutTypeBtn");
const lesbianBtn = document.getElementById("lesbianBtn");
const typeCowok = document.getElementById("typeCowok");

const spinBtn = document.getElementById("spinBtn");
const wheel = document.getElementById("wheel");
const result = document.getElementById("result");

const reaction1 = document.getElementById("reaction1");
const reaction2 = document.getElementById("reaction2");
const reaction3 = document.getElementById("reaction3");
const reaction4 = document.getElementById("reaction4");

let currentRotation = 0;
let spinDone = false;

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
  KUNCI UKURAN TOMBOL
  (dikunci sebelum pernah digeser supaya
  lebar/tinggi tidak collapse)
====================================*/
function lockSize(button){
    const rect = button.getBoundingClientRect();
    button.style.minWidth = rect.width + "px";
    button.style.height = rect.height + "px";
}

/*====================================
  GESER SUPER KECIL (~1mm) — FIXED
  Sekarang pakai CSS transform (bukan
  position/left/top). Transform tidak
  mempengaruhi alur layout, jadi tombol
  sebelahnya (Iya/Lanjut) TIDAK ikut
  bergeser lagi saat tombol ini digeser.
====================================*/
const MM_TO_PX = 3.8; // perkiraan 1mm dalam px CSS

function dodge(button){
    const maxShift = MM_TO_PX; // ~1mm
    const dx = (Math.random() * maxShift * 2 - maxShift);
    const dy = (Math.random() * maxShift * 2 - maxShift);
    button.style.transform = `translate(${dx}px, ${dy}px)`;
}

/*====================================
  POPUP REAKSI
  muncul 3 detik lalu hilang sendiri
====================================*/
function showPopup(el, emoji, text){
    el.innerHTML = `<span style="font-size:28px;display:block;margin-bottom:6px;animation:pop .4s ease">${emoji}</span>${text}`;
    el.classList.add("show");

    clearTimeout(el._hideTimer);
    el._hideTimer = setTimeout(()=>{
        el.classList.remove("show");
    }, 3000);
}

/*====================================
  TOMBOL "TIDAK / IH KEPO / IM LESBIAN"
  - klik ke-1 (ganjil): geser ~1mm saja
  - klik ke-2 (genap): popup muncul 3 detik
  - lalu berulang (klik 3 geser lagi, dst)
====================================*/
function setupEscapeButton(button, reactionEl, emoji, text){
    lockSize(button);

    let clickCount = 0;

    function handleTrigger(){
        clickCount++;
        if(clickCount % 2 === 1){
            dodge(button);
        } else {
            showPopup(reactionEl, emoji, text);
        }
    }

    button.addEventListener("click", handleTrigger);

    button.addEventListener("touchend", (e)=>{
        e.preventDefault();
        handleTrigger();
    });
}

setupEscapeButton(noBtn, reaction1, "😤", "Yaah, ternyata bukan kamu...");
setupEscapeButton(kepoBtn, reaction2, "🥲", "Ouhh gitu ya... im fine kok 🤍");
setupEscapeButton(lesbianBtn, reaction3, "😱", "HAH KAGET AKU WOEEE 😭");

/*====================================
  PAGE 1
====================================*/
yesBtn.onclick = ()=>{
    showPage(page2);
};

/*====================================
  PAGE 2
====================================*/
nextBtn.onclick = ()=>{
    if(story.value.trim() === ""){
        alert("Isi dulu dong 😚");
        return;
    }
    showPage(page3);
};

/*====================================
  PAGE 3
====================================*/
lanjutTypeBtn.onclick = ()=>{
    if(typeCowok.value.trim() === ""){
        alert("Isi dulu dong 😚");
        return;
    }
    showPage(page4);
};

/*====================================
  ANGKA DI WHEEL — kelipatan 5 (5-50)
====================================*/
const WHEEL_SEGMENTS = 10;

for(let i=0; i<WHEEL_SEGMENTS; i++){
    const angle = i*36 + 18;
    const label = document.createElement("span");
    label.className = "wheel-num";
    label.textContent = (i + 1) * 5;
    label.style.transform = `rotate(${angle}deg) translate(0, -95px) rotate(${-angle}deg)`;
    wheel.appendChild(label);
}

/*====================================
  SPIN WHEEL
====================================*/
function pickSegmentIndex(){
    if(Math.random() < 0.05){
        return Math.floor(Math.random()*4) + 6; // 35-50
    }
    return Math.floor(Math.random()*6); // 5-30
}

function getMessage(number){
    if(number <= 15) return "Yah bau belum mandi berarti 😂";
    if(number <= 30) return "Lumayan lah ya 😆";
    if(number <= 40) return "Anjay hoki juga kamu 🔥";
    return "Buset hoki bet 🤯";
}

spinBtn.onclick = function(){

    if(!spinDone){
        spinBtn.disabled = true;

        const idx = pickSegmentIndex();
        const angka = (idx + 1) * 5;
        const pesan = getMessage(angka);

        const segmentCenter = idx * 36 + 18;
        const targetMod = (360 - segmentCenter) % 360;
        const currentMod = ((currentRotation % 360) + 360) % 360;
        const extraToAlign = (targetMod - currentMod + 360) % 360;

        currentRotation += 360 * 6 + extraToAlign;
        wheel.style.transform = "rotate(" + currentRotation + "deg)";

        setTimeout(()=>{
            result.innerHTML = "<h2>" + angka + "</h2><br>" + pesan;

            sendToGoogleForm(
                story.value,
                typeCowok.value,
                angka
            );

            spinBtn.disabled = false;
            spinBtn.innerHTML = "Selesai ❤️";
            spinDone = true;
        }, 4200);

        return;
    }

    showPopup(reaction4, "🥰", "Makasih banyak Nur udah jawab semuanya ❤️🐾");
    spinBtn.disabled = true;
};

/*====================================
  GOOGLE FORM
====================================*/
function sendToGoogleForm(storyText, typeCowokText, spin){

    const url = "https://docs.google.com/forms/d/e/1FAIpQLSfYCJYg8grx-55pUmXQ0wp5ssZhhIDm4tVdSFvjXnuKnkf2xw/formResponse";

    const formData = new FormData();

    formData.append("entry.940726459", storyText);   // keseharian
    formData.append("entry.400613961", typeCowokText); // ur type cowo
    formData.append("entry.475853731", spin);         // hasil spin

    fetch(url, {
        method: "POST",
        mode: "no-cors",
        body: formData
    });
}

/*====================================
  PAW PRINTS DI BACKGROUND
====================================*/
const bg = document.querySelector(".background");

for(let i=0; i<6; i++){
    const paw = document.createElement("span");
    paw.textContent = "🐾";
    paw.style.left = Math.random()*100 + "%";
    paw.style.animationDelay = Math.random()*10 + "s";
    paw.style.animationDuration = 14 + Math.random()*10 + "s";
    bg.appendChild(paw);
}

