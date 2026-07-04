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
  (ukuran dikunci sebelum pernah digeser
  supaya lebar/tinggi tidak collapse)
====================================*/
function lockSize(button){
    const rect = button.getBoundingClientRect();
    button.style.minWidth = rect.width + "px";
    button.style.height = rect.height + "px";
}

/*====================================
  TOMBOL GESER DIKIT AJA (FIXED v2)
  - pergeseran selalu dihitung dari posisi
    ASAL (home), bukan dari posisi terakhir,
    supaya tidak "menumpuk" geseran kecil
    sampai kabur jauh.
  - jarak geser sekarang PROPORSIONAL ke
    ukuran kartu (persen, bukan px tetap),
    jadi di layar HP yang sempit geserannya
    otomatis lebih kecil.
  - hasil akhir selalu di-clamp ketat supaya
    tidak mungkin keluar dari kartu (yang
    sebelumnya jadi penyebab tombol "hilang"
    karena ke-clip oleh overflow:hidden).
====================================*/
function dodge(button, card, home){
    const cardRect = card.getBoundingClientRect();
    const btnRect = button.getBoundingClientRect();

    const padding = 12; // jarak aman dari tepi kartu

    // jarak geser maksimal = persentase dari ukuran kartu, dibatasi
    // 14-32px. ini yang bikin geseran di HP jauh lebih kecil dibanding
    // di layar lebar/desktop.
    const maxShiftX = Math.min(32, Math.max(14, cardRect.width * 0.10));
    const maxShiftY = Math.min(24, Math.max(10, cardRect.height * 0.06));

    let x = home.x + (Math.random() * maxShiftX * 2 - maxShiftX);
    let y = home.y + (Math.random() * maxShiftY * 2 - maxShiftY);

    const maxX = Math.max(padding, cardRect.width - btnRect.width - padding);
    const maxY = Math.max(padding, cardRect.height - btnRect.height - padding);

    x = Math.max(padding, Math.min(maxX, x));
    y = Math.max(padding, Math.min(maxY, y));

    button.style.position = "absolute";
    button.style.right = "auto";
    button.style.bottom = "auto";
    button.style.margin = "0";
    button.style.left = x + "px";
    button.style.top = y + "px";
}

/*====================================
  RESET POSISI TOMBOL
  Dipakai supaya kalau layar di-resize /
  rotasi HP, atau kalau font baru selesai
  load (ukuran tombol berubah setelahnya),
  tombol ditaruh balik ke posisi CSS asli
  lalu "home"-nya dihitung ulang dari nol.
  Ini yang memperbaiki bug "tombol hilang".
====================================*/
function resetButtonPosition(button){
    button.style.position = "";
    button.style.left = "";
    button.style.top = "";
    button.style.right = "";
    button.style.bottom = "";
    button.style.margin = "";
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
  TOMBOL KABUR (sistem terpusat) — FIXED
  - klik ke-1 (ganjil): tombol geser sedikit
  - klik ke-2 (genap): popup muncul 3 detik
  - lalu berulang (klik 3 geser lagi, dst)
  - hover TIDAK lagi memicu geser, karena itu
    yang menyebabkan tombol "kabur jauh" akibat
    event mouseenter yang terus-menerus terpicu
====================================*/
function setupEscapeButton(button, reactionEl, emoji, text){

    const card = button.closest(".card");
    let home = null;
    let clickCount = 0;

    function captureHome(){
        // pastikan tombol dalam posisi CSS aslinya dulu sebelum diukur
        resetButtonPosition(button);
        lockSize(button);
        const cardRect = card.getBoundingClientRect();
        const btnRect = button.getBoundingClientRect();
        home = {
            x: btnRect.left - cardRect.left,
            y: btnRect.top - cardRect.top
        };
    }

    captureHome();

    // ukuran font Google Fonts dimuat async: kalau baru selesai load
    // SETELAH home dihitung, ukuran tombol bisa berubah dan bikin
    // posisi lama jadi salah (tombol terlihat "hilang"/ke-clip).
    // Jadi kita hitung ulang home begitu font benar-benar siap.
    if(document.fonts && document.fonts.ready){
        document.fonts.ready.then(captureHome);
    }

    // kalau layar di-resize atau HP dirotasi, ukuran/posisi kartu
    // berubah -> hitung ulang home supaya batas geser tetap akurat
    let resizeTimer;
    window.addEventListener("resize", ()=>{
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(captureHome, 200);
    });

    function handleTrigger(){
        if(!home) captureHome();
        clickCount++;
        if(clickCount % 2 === 1){
            dodge(button, card, home);
        } else {
            showPopup(reactionEl, emoji, text);
        }
    }

    button.addEventListener("click", handleTrigger);

    // dukungan mobile (tap) — pakai handler yang sama, jangan dobel dengan click
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
  SPIN WHEEL — FIXED
  Sekarang hasil SELALU kelipatan 5 (5-50)
  DAN posisi wheel berhenti tepat di segmen
  yang sesuai dengan angka hasilnya (jujur/transparan,
  bukan cuma angka acak yang tidak nyambung sama
  posisi berhentinya roda).
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
====================================*/
function sendToGoogleForm(storyText, typeCowokText, spin){

    const url = "https://docs.google.com/forms/d/e/1FAIpQLSfYCJYg8grx-55pUmXQ0wp5ssZhhIDm4tVdSFvjXnuKnkf2xw/formResponse";

    const formData = new FormData();

    formData.append("entry.940726459", storyText);      // keseharian
    formData.append("entry.475853731", spin);            // hasil spin

    // GANTI angka di bawah ini dengan entry ID punya form kamu sendiri
    // untuk pertanyaan "ur type cowo"
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

