const playback = document.querySelector("#playback");
const volume = document.querySelector("#volume");
const video = document.querySelector("#v-frame");
const playPauseBtn = document.querySelector("#play-pause");
const playSign = document.querySelector(".video .video-player img");
const videoControls = document.querySelector("#video-controls");
const fullScreen = document.querySelector("#fullscreen");

function updateGradient(slider) {
    const min = 0;
    const max = parseFloat(slider.max);
    const val = parseFloat(slider.value);
    const percentage = ((val - min) / (max - min)) * 100;
    slider.style.backgroundImage = `linear-gradient(90deg, #710707 ${percentage}%, transparent ${percentage}%)`; 
};

let playedOnce;
function playPause(){
    if(!playedOnce){
        video.currentTime = 0.1;
        playback.setAttribute("max", `${video.duration}`);
        playedOnce = true;
    };
    
    if(playPauseBtn.classList.contains("play")){
        playPauseBtn.classList.remove("play");
        playPauseBtn.classList.add("pause");
        playSign.classList.remove("img");
        video.play();
    } else {
        playPauseBtn.classList.remove("pause");
        playPauseBtn.classList.add("play");
        playSign.classList.add("img");
        video.pause();
    };
};

function checkVideoMeta(){
    if(video.duration > 0){
        videoControls.classList.add("show");
        playSign.classList.add("img");
        volume.value = video.volume;
        updateGradient(playback);
        updateGradient(volume);
    } else {
        console.log("⚠️ video.duration ещё не готов, повтор через 500мс...")
        setTimeout(checkVideoMeta, 500);
    };
};

document.addEventListener("DOMContentLoaded", function(){
    checkVideoMeta();
});

volume.addEventListener("input", function(e){
    updateGradient(e.target);
    video.volume = e.target.value;
});

video.addEventListener("timeupdate", () => {
    playback.value = video.currentTime;
    updateGradient(playback);
});

playback.addEventListener("input", function(e){
    playback.value = e.target.value;
    video.currentTime = e.target.value;
});

const clickElements = [playPauseBtn, video, playSign];
clickElements.forEach(function(element){
    element.addEventListener("click", function(e){
        if(videoControls.classList.contains("show")){
            playPause();
        };
    })
});

fullScreen.addEventListener("click", function(e){
    video.requestFullscreen();
})