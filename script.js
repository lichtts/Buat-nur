const yes = document.getElementById("yes");
const no = document.getElementById("no");
const area = document.querySelector(".button-area");

function moveButton() {

    const areaWidth = area.clientWidth;
    const areaHeight = area.clientHeight;

    const buttonWidth = yes.offsetWidth;
    const buttonHeight = yes.offsetHeight;

    let x, y;

    do {

        x = Math.random() * (areaWidth - buttonWidth);

        y = Math.random() * (areaHeight - buttonHeight);

    } while (

        x > areaWidth - 220 &&
        y > 10 &&
        y < 120

    );

    yes.style.left = x + "px";
    yes.style.top = y + "px";
}

yes.addEventListener("mouseenter", moveButton);
yes.addEventListener("touchstart", moveButton);
yes.addEventListener("click", moveButton);

no.onclick = () => {

    window.location.href = "page2.html";

};
