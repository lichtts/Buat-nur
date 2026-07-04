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
  POPUP REAKSI
  muncul 3 detik lalu hilang sendiri,
  halaman tidak berpindah sama sekali
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
  TOMBOL "TIDAK / IH KEPO / IM LESBIAN" — DISEDERHANAKAN
  Tidak ada lagi animasi geser sama sekali (jadi tidak
  ada lagi bug tombol hilang/kabur jauh). Sekarang tombol
  diam di tempat, sekali klik langsung muncul popup
  emoji + teks selama 3 detik.
====================================*/
function setupReactionButton(button, reactionEl, emoji, text){
    button.addEventListener("click", ()=>{
        showPopup(reactionEl, emoji, text);
    });
}

setupReactionButton(noBtn, reaction1, "😤", "Yaah, ternyata bukan kamu...");
setupReactionButton(kepoBtn, reaction2, "🥲", "Ouhh gitu ya... im fine kok 🤍");
setupReactionButton(lesbianBtn, reaction3, "😱", "HAH KAGET AKU WOEEE 😭");

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
  index 0-9 -> angka 5,10,15,...,50
====================================*/
const WHEEL_SEGMENTS = 10;

for(let i=0; i<WHEEL_SEGMENTS; i++){
    const angle = i*36 + 18; // titik tengah tiap segmen warna
    const label = document.createElement("span");
    label.className = "wheel-num";
    label.textContent = (i + 1) * 5;
    label.style.transform = `rotate(${angle}deg) translate(0, -95px) rotate(${-angle}deg)`;
    wheel.appendChild(label);
}

/*====================================
  SPIN WHEEL
  Hasil selalu kelipatan 5 (5-50) DAN posisi
  roda berhenti tepat di segmen yang sesuai
  dengan angka hasilnya.
====================================*/
function pickSegmentIndex(){
    // 5% peluang mendapat angka tinggi (35-50 -> index 6-9)
    if(Math.random() < 0.05){
        return Math.floor(Math.random()*4) + 6;
    }
    // 95% peluang mendapat angka 5-30 -> index 0-5
    return Math.floor(Math.random()*6);
}

function getMessage(number){
    if(number <= 15) return "Yah bau belum mandi berarti 😂";
    if(number <= 30) return "Lumayan lah ya 😆";
    if(number <= 40) return "Anjay hoki juga kamu 🔥";
    return "Buset hoki bet 🤯";
}

spinBtn.onclick = function(){

    // klik pertama = spin
    if(!spinDone){
        spinBtn.disabled = true;

        const idx = pickSegmentIndex();
        const angka = (idx + 1) * 5;
        const pesan = getMessage(angka);

        // titik tengah segmen ini di roda (searah jarum jam dari atas)
        const segmentCenter = idx * 36 + 18;

        // supaya segmen ini berhenti tepat di bawah penunjuk (atas, 0deg),
        // hitung rotasi tambahan yang dibutuhkan dari posisi rotasi saat ini
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

    // klik kedua (tombol "Selesai") = ucapan terima kasih sebagai popup
    showPopup(reaction4, "🥰", "Makasih banyak Nur udah jawab semuanya ❤️🐾");
    spinBtn.disabled = true;
};

/*====================================
  GOOGLE FORM
  GANTI url dan entry.xxxxxxxxx di bawah
  ini sesuai form baru kamu.
====================================*/
function sendToGoogleForm(storyText, typeCowokText, spin){

    const url = "GANTI_DENGAN_URL_FORMRESPONSE_KAMU";

    const formData = new FormData();

    formData.append("entry.GANTI_INI", storyText);      // keseharian
    formData.append("entry.GANTI_INI", typeCowokText);  // ur type cowo
    formData.append("entry.GANTI_INI", spin);           // hasil spin

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
