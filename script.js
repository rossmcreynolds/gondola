const songs = [];

const songFileNames = [
    "assets/tracks/01_Is This Even Real_MST 8.21.mp3",
    "assets/tracks/02_Sketches of London_MST 8.24.2.mp3",
    "assets/tracks/03_Tied to His Brother_MST 8.21.mp3",
    "assets/tracks/04_Int.Amb._MST 8.24.mp3",
    "assets/tracks/05_Sundawg_MST 8.21.mp3",
    "assets/tracks/06_KordArp_MST 8.24.mp3",
    "assets/tracks/07_ExtAudSeq_MST 8.24.mp3",
    "assets/tracks/08_CouplA Beasts_MST 8.21.mp3",
    "assets/tracks/09_A Nagging_MST 8.21.mp3"
];

// Load sounds into the array
for (let i = 0; i < songFileNames.length; i++) {
    songs.push(new Audio(songFileNames[i]));

    //LOADING EFFECT:
    //titles get 'unredacted' on load  
    songs[i].addEventListener("loadeddata", () => {
        document.querySelectorAll("h1")[i].style.boxShadow = "inset 0 0 0 black";
    });

    if (i != songFileNames.length) {
        songs[i].addEventListener('ended', function () {
            audioManager(i + 1, true);
        });
    }

}

//PLAYBACK LOGIC
//if user clicks title:
//if they clicked the most recently clicked song:
//if it was playing, pause it at timestamp
//else play from timestamp
//else stop anything playing and play clicked title

let currentTrack = -1;

function audioManager(track, auto) {
    if (currentPage == 1 || auto || isPortrait) {
        let trackNum = track;

        if (trackNum == currentTrack) {
            if (songs[trackNum].paused) {
                songs[trackNum].play();
                document.querySelectorAll("h1")[trackNum].classList.add("bounce-text");
                for (let i = 0; i < 4; i++) {
                    document.getElementsByClassName("small-head")[i].classList.add("bounce-head" + i);
                }

            } else {
                songs[trackNum].pause();
                document.querySelectorAll("h1")[trackNum].classList.remove("bounce-text");
                for (let i = 0; i < 4; i++) {
                    document.getElementsByClassName("small-head")[i].classList.remove("bounce-head" + i);
                }
            }
        } else {
            if (currentTrack != -1) {
                songs[currentTrack].pause();
                document.querySelectorAll("h1")[currentTrack].classList.remove("bounce-text");
                for (let i = 0; i < 4; i++) {
                    document.getElementsByClassName("small-head")[i].classList.remove("bounce-head" + i);
                }
            }
            songs[trackNum].currentTime = 0;
            songs[trackNum].play()
            document.querySelectorAll("h1")[trackNum].classList.add("bounce-text");
            for (let i = 0; i < 4; i++) {
                document.getElementsByClassName("small-head")[i].classList.add("bounce-head" + i);
            }
            currentTrack = trackNum;
        }
    }
}





//HOVER effect:
//when hovering, randomly change letters between cases... when remove hover, snap back to original
let repeater;

let tracks = [
    "IS THIS EVEN REaL",
    "SKETCHES OF LONDON",
    "TIED TO HIS BROTHER",
    "INT.aMB",
    "SUNDaWG",
    "KORDaRP",
    "EXTaUDSEQ",
    "COUPLa BEATS",
    "a NAGGING"
]

let currentText = ""
let previousIndex = -1;

function hoverEffect(i) {
    if (i != previousIndex) {
        currentText = tracks[i];
        previousIndex = i;
    }

    let newText = currentText.split('');
    let idx = Math.floor(Math.random() * newText.length);

    if (checkCase(newText[idx]) == "Uppercase") {
        newText[idx] = newText[idx].toLowerCase();
    } else if (checkCase(newText[idx]) == "Lowercase") {
        newText[idx] = newText[idx].toUpperCase();
    }

    newText = newText.join('');

    document.querySelectorAll("span")[i].textContent = newText;

    currentText = newText;
}

function leaveHover(i) {
    document.querySelectorAll("span")[i].textContent = tracks[i];
}

function checkCase(character) {
    if (character === character.toUpperCase() && character !== character.toLowerCase()) {
        return "Uppercase";
    } else if (character === character.toLowerCase() && character !== character.toUpperCase()) {
        return "Lowercase";
    } else {
        return "Not an alphabetic character";
    }
}

let hasHovered = false;

function toggleSpeech(on) {
    if (currentPage == 1) {
        hasHovered = true;

        let bubble = document.getElementsByClassName('speech-bubble')[0];

        if (on) {
            bubble.style.opacity = 100;
        } else {
            bubble.style.opacity = 0;
        }
    }
}

//Landscape Page Logic

let currentPage = 1;
let returnPage = 1;

function getFlexOrderItem(element) {
    const style = window.getComputedStyle(element);
    // getPropertyValue returns a string, convert to an integer
    return parseInt(style.getPropertyValue('order'), 10);
}

function changePage(nextPage) {

    if (window.innerWidth / window.innerHeight > 4 / 3) {

        //rotate to right
        if ((nextPage + 1) % 3 == currentPage) {
            for (let i = 1; i <= 3; i++) {
                let element = document.getElementsByClassName("page" + i)[0];
                let order = window.getComputedStyle(element).getPropertyValue('order');
                document.getElementsByClassName("page" + i)[0].style.order = (order + 1) % 3;
            }
        }

        //rotate to left 
        else if ((nextPage + 2) % 3 == currentPage) {
            for (let i = 1; i <= 3; i++) {
                let element = document.getElementsByClassName("page" + i)[0];
                let order = window.getComputedStyle(element).getPropertyValue('order');
                document.getElementsByClassName("page" + i)[0].style.order = (order + 2) % 3;
            }
        }

        currentPage = nextPage;

        for (let i = 1; i <= 3; i++) {
            let div = document.getElementsByClassName("page" + i)[0];
            let style = div.style;

            //emphasise current page
            if (i - 1 == currentPage) {
                style.height = '100vh';
                style.width = '100vh';
                style.aspectRatio = '1/1';
                style.flex = 5;
                style.margin = '0vh';
                style.cursor = 'default';
                div.classList.remove("sidepage");
            }
            //de-emphasise other pages
            else {
                style.height = '22.22vw';
                style.width = '29.64vw';
                style.aspectRatio = '3/4';
                style.flex = 2;
                style.margin = '5vh';
                style.cursor = 'pointer';
                div.classList.add("sidepage");
            }
        }
    }

    if (currentPage == 2){
        document.querySelectorAll("pre")[0].style.fontSize = '2.3vh';
    } else if (isPortrait){
        document.querySelectorAll("pre")[0].style.fontSize = '2.4vh';
    } else if (!isPortrait){
        document.querySelectorAll("pre")[0].style.fontSize = '0.5vw';
    }

}

window.addEventListener('load', () => {
    const targetDiv = document.getElementById('center-me');
    targetDiv.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
    });
});

let isPortrait = true;
let wasPortrait = true;

function windowResize() {
    if (window.innerWidth / window.innerHeight < 4 / 3) {
        isPortrait = true;
    } else {
        isPortrait = false;
    }

    if (isPortrait && !wasPortrait) {

        let targetDiv = document.getElementsByClassName("page" + (currentPage + 1))[0];
        targetDiv.scrollIntoView({
            behavior: 'auto', 
            block: 'center',
            inline: 'center'
        });

        for (let i = 1; i <= 3; i++) {
            let div = document.getElementsByClassName("page" + i)[0];
            let style = div.style;

            style.width = '100vw';
            style.height = '100vh';
            style.margin = '0';
            style.marginBottom = '5vh';
            style.paddingBottom = '2vh';
            style.flex = 'none';
            style.scrollSnapAlign = 'center';
            style.tranitionDuration = '0s';
            // style.opacity = 1;
            style.cursor = 'default';
        }
    } else if (!isPortrait && wasPortrait) {
        for (let i = 1; i <= 3; i++) {
            let div = document.getElementsByClassName("page" + i)[0];
            let style = div.style;

            //emphasise current page
            if (i - 1 == currentPage) {
                style.height = '100vh';
                style.width = '100vh';
                style.flex = 5;
                style.margin = '0vh';
                style.paddingBottom = '0vh';
                style.cursor = 'default';
                // style.opacity = 1;
                div.classList.remove("sidepage");
            }
            //de-emphasise other pages
            else {
                style.height = '22.22vw';
                style.width = '29.64vw';
                style.flex = 2;
                style.margin = '5vh';
                style.paddingBottom = '0vh';
                // style.opacity = 0.8;
                style.cursor = 'pointer';
                div.classList.add("sidepage");
            }
        }

        changePage(returnPage);

    }

    if (currentPage == 2){
        document.querySelectorAll("pre")[0].style.fontSize = '2.3vh';
    } else if (isPortrait){
        document.querySelectorAll("pre")[0].style.fontSize = '2.4vh';
    } else if (!isPortrait){
        document.querySelectorAll("pre")[0].style.fontSize = '0.5vw';
    }

    if (window.innerWidth / window.innerHeight < 0.57){
        document.querySelectorAll("pre")[0].style.fontSize = '4.2vw';
    }

    if (window.innerWidth / window.innerHeight < 4 / 3) {
        wasPortrait = true;
    } else {
        wasPortrait = false;
    }
}

window.onresize = windowResize;
screen.orientation.addEventListener('change', windowResize());

const scrollContainer = document.body;

scrollContainer.addEventListener('scrollsnapchange', (event) => {
    const snappedBlockElement = event.snapTargetBlock;

    if (snappedBlockElement) {
        returnPage = snappedBlockElement.classList[0].slice(-1) - 1;
    }
});

window.onload = function() {
    for (let i = 0; i < songFileNames.length; i++){
        setTimeout(function() {
            document.querySelectorAll("h1")[i].style.boxShadow = "inset 0 0 0 black";
        }, i*1000*Math.random()+500);
    }
};
