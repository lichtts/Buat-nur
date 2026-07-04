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
  TOMBOL KABUR (gerak sedikit aja,
  supaya masih kelihatan tapi susah diklik)
====================================*/
function dodge(button){
    const card = button.closest(".card");
    const cardRect = card.getBoundingClientRect();
    const btnRect = button.getBoundingClientRect();

    // posisi sekarang relatif ke card
    let x = btnRect.left - cardRect.left;
    let y = btnRect.top - cardRect.top;

    // geser kecil aja (30-70px), bukan lompat jauh
    x += (Math.random()*90 - 45);
    y += (Math.random()*50 - 25);

    const maxX = cardRect.width - btnRect.width - 16;
    const maxY = cardRect.height - btnRect.height - 16;

    x = Math.max(16, Math.min(maxX, x));
    y = Math.max(16, Math.min(maxY, y));

    button.style.left = x + "px";
    button.style.top = y + "px";
}

function showReaction(el, emoji, text){
    el.innerHTML = `<span style="font-size:26px;display:block;margin-bottom:4px;animation:pop .4s ease">${emoji}</span>${text}`;
    el.classList.add("show");
}

/*====================================
  PAGE 1 — Tidak (3x klik baru nyerah)
====================================*/
let noClicks = 0;

noBtn.addEventListener("click", ()=>{
    noClicks++;
    if(noClicks >= 3){
        noBtn.disabled = true;
        showReaction(reaction1, "😤", "Yaah, ternyata bukan kamu...");
    } else {
        dodge(noBtn);
    }
});

// biar di desktop juga kerasa "kabur" pas didekatin cursor
noBtn.addEventListener("mouseenter", ()=>{
    if(noClicks < 3) dodge(noBtn);
});

yesBtn.onclick = ()=>{
    showPage(page2);
};

/*====================================
  PAGE 2 — Kepoin dulu ah (3x klik)
====================================*/
let kepoClicks = 0;

kepoBtn.addEventListener("click", ()=>{
    kepoClicks++;
    if(kepoClicks >= 3){
        kepoBtn.disabled = true;
        showReaction(reaction2, "🥲", "Ouhh gitu ya... im fine kok 🤍");
    } else {
        dodge(kepoBtn);
    }
});

kepoBtn.addEventListener("mouseenter", ()=>{
    if(kepoClicks < 3) dodge(kepoBtn);
});

nextBtn.onclick = ()=>{
    if(story.value.trim() === ""){
        alert("Isi dulu dong 😚");
        return;
    }
    showPage(page3);
};

/*====================================
  PAGE 3 — Ur type cowo (BARU)
====================================*/
lesbianBtn.addEventListener("click", ()=>{
    showReaction(reaction3, "😱", "HAH KAGET AKU WOEEE 😭");
    dodge(lesbianBtn);
});

lesbianBtn.addEventListener("mouseenter", ()=>{
    dodge(lesbianBtn);
});

lanjutTypeBtn.onclick = ()=>{
    if(typeCowok.value.trim() === ""){
        alert("Isi dulu dong 😚");
        return;
    }
    showPage(page4);
};

/*====================================
  SPIN WHEEL (tidak diubah logikanya)
====================================*/
function randomNumber(){
    // 5% peluang mendapat 35-50
    if(Math.random() < 0.05){
        return Math.floor(Math.random()*16) + 35;
    }
    // 95%
    return Math.floor(Math.random()*34) + 1;
}

function getMessage(number){
    if(number <= 15) return "Yah bau belum mandi berarti 😂";
    if(number <= 26) return "Lumayan lah ya 😆";
    if(number <= 34) return "Anjay hoki juga kamu 🔥";
    return "Buset hoki bet 🤯";
}

spinBtn.onclick = function(){
    spinBtn.disabled = true;

    const angka = randomNumber();
    const pesan = getMessage(angka);

    currentRotation += 360*6 + (angka*7);
    wheel.style.transform = "rotate(" + currentRotation + "deg)";

    setTimeout(()=>{
        result.innerHTML = "<h2>" + angka + "</h2><br>" + pesan;

        sendToGoogleForm(
            story.value,
            typeCowok.value,
            angka
        );

        spinBtn.innerHTML = "Selesai ❤️";
    }, 4200);
};

/*====================================
  GOOGLE FORM
====================================*/
function sendToGoogleForm(storyText, typeCowokText, spin){

    const url = "https://docs.google.com/forms/d/e/1FAIpQLSfYCJYg8grx-55pUmXQ0wp5ssZhhIDm4tVdSFvjXnuKnkf2xw/formResponse";

    const formData = new FormData();

    formData.append("entry.940726459", storyText);      // keseharian
    formData.append("entry.475853731", spin);            // hasil spin

    // GANTI angka di bawah ini dengan entry ID punya form kamu sendiri
    // untuk pertanyaan "ur type cowo" (lihat cara mendapatkannya di
    // pesan chat, bagian "Cara sambungin ke Google Form")
    formData.append("entry.000000000", typeCowokText);   // ur type cowo

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
    
