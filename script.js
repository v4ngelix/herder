//DOM items:
const preloader = document.querySelector(".js-preloader");
const container = document.querySelectorAll(".container");
const pages = document.getElementsByTagName("section");
const appWindow = document.querySelector(".js-appWindow");


let read = 0;

//Changeable states:
let enabled = true; //scroll
let paused = true; //to avoid navigation js spam
let language = "EST";

//XHR state flags:
let videoLoaded = false;
let archiveDocLoaded = false; //KASUTAMATA

const pageCount = container.length + 1;

let isContentLoaded = new Array(pageCount);
let conteinerCount = read - 1;


//Launch initial code - removes preloader and displays first "Section":
document.addEventListener("load", pageLoaded());

function pageLoaded() {
    resetContentStates();
    for (read = 1; read < 6;) {
        console.log(read);
        askForContent();
        console.log("preloaded index " + read);
        read += 1;
    }
    read = 0;
    setTimeout(function () {
        preloader.classList.replace("preloader--visible", "preloader--invisible");
        appWindow.classList.replace("invisible", "visible");
        pages[0].classList.replace("invisible", "visible");
        pages[0].classList.replace("above", "center");
        setTimeout(function () {
            container[0].classList.remove("delay");
            preloader.style.display = "none";
        }, 2000);
    }, 2500);
}

function decrement() {
    if (read > 0) {
        pages[read].classList.replace("center", "below");
        read -= 1;
        let fadeItem = pages[read].querySelector(".container");
        askForContent();
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
        askForContent();
        if (fadeItem === null) {
            //do nothing
        } else {
            fadeItem.classList.add("visible");
            fadeItem.classList.replace("invisible", "visible");
        }
    }
    if (read === 21) {
        if (videoLoaded === false) {
            requestVideo();
            videoLoaded = true;
        }
        else {
            console.log("video already loaded");
        }
    }
}

window.addEventListener("keydown", function (keydown) {
    let key;
    key = keydown.keyCode;
    if (enabled === true && paused === true) {
        switch (key) {
            case 38:
                decrement();
                break;
            case 40:
                increment();
                break;
        }

        console.log("current page: " + read);
        paused = false;
        setTimeout(function () { paused = true; }, 500);
    }
});

window.addEventListener("wheel", function (wheel) {
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
        setTimeout(function () { paused = true; }, 500);
    }
});

function askForContent() {
    console.log(read);
    let ARV = read - 1;
    if (isContentLoaded[read] === false) {
        switch (read) {
            case 0:
                console.log("Nothing to load");
                break;
            case 21:
                console.log("Nothing to load");
                break;
            default:
                let contentURL = "text/" + language + "/" + read + ".txt";
                let fetchContent = new XMLHttpRequest();
                fetchContent.open("GET", contentURL);
                fetchContent.overrideMimeType('text/xml; charset=iso-8859-1');
                fetchContent.send();
                fetchContent.onreadystatechange = function () {
                    if (this.status === 200) {
                        let vastus = decodeURIComponent(fetchContent.response);
                        container[ARV].innerHTML = vastus; //viskab teksti sisse
                        console.log("container[ARV] " + container[ARV]);
                    }
                };
                console.log(contentURL);
                isContentLoaded[read] = true;
        }
    }
    else {
        console.log("Content already loaded.");
    }
}

function resetContentStates() {
    for (var stateIndex = 0; stateIndex < pageCount; stateIndex++) {
        isContentLoaded[stateIndex] = false;
        console.log(isContentLoaded[stateIndex]); //State given;
    }
    console.log(isContentLoaded.length); //No of loadable content;
}

function requestVideo() {
    let videoDiv = document.querySelector(".js-video");
    console.log(videoDiv);
    videoDiv.innerHTML = '<video width="720" height="404" controls><source src="media/video.mp4" type="video/mp4"></video>';
}
function requestArchiveDoc() {
    let archiveDiv = document.querySelector(".js-archive");
    archiveDiv.innerHTML = '<embed src="media/arhiiv.pdf" type="application/pdf" width="100%" height="100%" />';
}

//function tagasiÜlesse() {
//    for (read; read > 0;) {
//        decrement();
//    }
//}

function changeLanguage(langSwitch) {
    if (langSwitch === language) {
        console.log("Nothing to change");
    }
    else {
        language = langSwitch;
        console.log("changed to " + langSwitch);
        resetContentStates();

    }

}

function reloadCurrentPageContent() {
    console.log(read);
    let ARV = read - 1;
    switch (read) {
        case 0:
            console.log("Nothing to load");
            break;
        case 21:
            console.log("Nothing to load");
            break;
        default:
            let contentURL = "text/" + language + "/" + read + ".txt";
            let fetchContent = new XMLHttpRequest();
            fetchContent.open("GET", contentURL);
            fetchContent.overrideMimeType('text/xml; charset=iso-8859-1');
            fetchContent.send();
            fetchContent.onreadystatechange = function () {
                if (this.status === 200) {
                    let vastus = decodeURIComponent(fetchContent.response);
                    container[ARV].innerHTML = vastus; //viskab teksti sisse
                    console.log("container[ARV] " + container[ARV]);
                }
            };
            console.log(contentURL);
            isContentLoaded[read] = true;
    }
}
