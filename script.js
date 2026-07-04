const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

function moveButton(){

    const card = document.querySelector(".card");

    const maxX = card.clientWidth - noBtn.offsetWidth - 20;
    const maxY = 90;

    let x;
    let y;

    do{

        x = Math.random() * maxX;
        y = Math.random() * maxY + 20;

    }while(
        Math.abs(x - 40) < 140
    );

    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
    noBtn.style.right = "auto";

}

noBtn.addEventListener("mouseenter", moveButton);

noBtn.addEventListener("touchstart", function(e){
    e.preventDefault();
    moveButton();
});

yesBtn.addEventListener("click", function(){

    alert("Halaman 2 akan kita buat setelah ini 😁");

});
