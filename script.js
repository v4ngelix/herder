"use strict";
const preloader = document.querySelector(".preloader");
const titlePage = document.querySelector(".title");
const container = document.querySelectorAll(".container");
const farBack = document.querySelector(".farBack");
const downButton = document.querySelector(".nuppAlla");
const up = document.querySelector(".tagasiÜlesse");
let enabled = true;
let paused = true;

const pages = document.getElementsByTagName("section");
let read;
read = 0;


document.addEventListener("load", pageLoaded());

function pageLoaded() {
    setTimeout(pageStart, 2500);
}

function pageStart() {
    preloader.classList.replace("visible", "longInvisible");
    farBack.classList.replace("invisible", "longvisible");
    container[0].classList.replace("invisible", "visible");
    pages[0].classList.replace("above", "center");
    setTimeout(hidePreloader, 3000);
}

function hidePreloader() {
    container[0].classList.remove("delay");
    preloader.style.display = "none";
}

function decrement() {
    if (read > 0) {
        pages[read].classList.replace("center", "below");
        read -= 1;
        let fadeItem = pages[read].querySelector(".container");
        if (fadeItem === null) {
            //do nothing
        } else {
            fadeItem.classList.replace("invisible", "visible");
        }

        let preFadeItem = pages[read + 1].querySelector(".container");

        if (preFadeItem === null) {
            //do nothing
        } else {
            preFadeItem.classList.replace("visible", "invisible");
        }
    }
    if (read < 1) {
        up.classList.replace("visible", "invisible");
    }
}

function subIncrement() {
    read += 1;
    pages[read].classList.add("center");
    pages[read].classList.replace("invisible", "visible");
    pages[read].classList.replace("below", "center");

    let preFadeItem;
    preFadeItem = pages[read - 1].querySelector(".container");

    if (preFadeItem === null) {
        //do nothing
    } else {
        preFadeItem.classList.replace("visible", "invisible");
    }
}

function increment() {
    if (read < pages.length - 1) {
        subIncrement();
        let fadeItem = pages[read].querySelector(".container");
        if (fadeItem === null) {
            //do nothing
        } else {
            fadeItem.classList.add("visible");
            fadeItem.classList.replace("invisible", "visible");
        }
    }
    if (read > 0) {
        up.classList.replace("invisible", "visible");
    }
}

window.addEventListener("keydown", function(keydown) {
    let key;
    key = keydown.keyCode;
    if (enabled === true && paused === true) {
        switch (key) {
            case 38: //Ülesse
                decrement();
                break;
            case 40: //Alla
                increment();
                break;
        }

        console.log("current page: " + read);
        paused = false;
        setTimeout(function() { paused = true; }, 1000);
    }
});
window.addEventListener("wheel", function(wheel) {
    let scroll;
    scroll = wheel.deltaY;
    if (enabled === true && paused === true) {
        if (scroll < 0) {
            decrement();
        } else {
            increment();
        }

        console.log("current page: " + read);
        paused = false;
        setTimeout(function() { paused = true; }, 1000);
    }
});


const aside = document.querySelector("aside");
const lisainfo = document.querySelector(".lisaInfo");
let sisu = document.querySelectorAll(".sisu");
let current;

let tekst = document.querySelector(".tekst");
let getInfo = new XMLHttpRequest();

function request(input) {
    getInfo.onreadystatechange = function() {
        if (this.readystate == 4 || this.status == 200) {
            tekst.innerHTML = getInfo.responseText;
            console.log("jee");
        }
    };
    getInfo.open("GET", "text/" + input + ".txt");
    getInfo.send();
    console.log("jeej");

}



function peidaSisu() {
    for (let n = 0; n < sisu.length; n++)
        sisu[n].classList.replace("visible", "invisible");
}

function info(input) {
    peidaSisu();
    request(input);

    if (input < 13) { input = 14 };
    current = input;
    enabled = false;
    aside.classList.replace("nodisplay", "display");
    lisainfo.classList.replace("nodisplay", "display");
    sisu[current].classList.replace("nodisplay", "display");
    setTimeout(display, 30);
}

function peida() {
    lisainfo.classList.replace("visible", "invisible");
    aside.classList.replace("asideOut", "asideDefault");
    container[read].removeEventListener("mousedown", peida);
    enabled = true;
    peidaSisu();
    container[read].classList.replace("invisible", "visible");
    setTimeout(nodisplay, 3000);
}

function display() {
    container[read].classList.replace("visible", "invisible");
    lisainfo.classList.replace("invisible", "visible");
    aside.classList.replace("asideDefault", "asideOut");

    sisu[current].classList.replace("invisible", "visible");
}

function nodisplay() {
    if (enabled === true) {
        lisainfo.classList.replace("display", "nodisplay");
        aside.classList.replace("display", "nodisplay");
        for (let n = 0; n < sisu.length; n++)
            sisu[n].classList.replace("display", "nodisplay");
    }
}

function tagasiÜlesse() {
    for (read; read > 0;) {
        decrement();
    }
}