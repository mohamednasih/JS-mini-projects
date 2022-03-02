//audio metadata reader
const jsmediatags = window.jsmediatags

const songTitle = document.querySelector("#song-title")
const artist = document.querySelector("#artist")
const song_duration = document.querySelector("#song-duration")

const currentProgress = document.querySelector("#now")
const duration_now = document.querySelector("#duration-now")
const progressbar = document.querySelector("#progress-bar")
const player = document.querySelector("#player")

const playButton = document.querySelector("#play")
const nextButton = document.querySelector("#next")
const prevButton = document.querySelector("#prev")

var audio = document.querySelector("#audio");
const file = document.getElementById("file");

var songDuration = 0
var songs = null;
var curentSongIndex = 0

var isPlaying = false;
// when users select files
file.addEventListener("change", (event) => {

    songs = event.target.files;
    if (songs.length == 1) { nextButton.classList.add("disabled") }

    file.hidden = true;
    player.hidden = false;
    loadSong()

})

//add song to the dom
function loadSong() {

    loadMetadata()
    audio.src = URL.createObjectURL(songs[curentSongIndex]);
}
//update current time of the played song
audio.addEventListener("timeupdate", updateTime)

function updateTime(e) {

    const { currentTime } = e.srcElement;
    updateProgressor(currentTime)

}

//move the progress bar
function updateProgressor(currentDuration) {

    currentProgress.style.width = (currentDuration / songDuration) * 100 + '%';
    duration_now.innerHTML = convertHMS(currentDuration)

}

//finding where the user want to move in the song

function moveProgressBar(e) {

    const barPercent = (e.offsetX / progressbar.offsetWidth)
    let wantedDuration = songDuration * barPercent;
    audio.currentTime = wantedDuration
    updateProgressor(wantedDuration)

}
progressbar.addEventListener("click", moveProgressBar)

//play next song
function nextSong(){
    
    if (curentSongIndex == 0 && songs.length > 1) {
        prevButton.classList.remove("disabled")
    }
    if (curentSongIndex < songs.length) {
        curentSongIndex++;
        loadSong()
    }
    if (curentSongIndex == songs.length - 1) {
        nextButton.classList.add("disabled")

    }


}

nextButton.addEventListener("click",nextSong)

//previeous song
function previous() {

    if (curentSongIndex >= 1) {
        if (curentSongIndex == 1) { prevButton.classList.add("disabled") }
        if (curentSongIndex == songs.length - 1) {
            nextButton.classList.remove("disabled")

        }
        curentSongIndex--;
        loadSong()
    }
}
prevButton.addEventListener("click",previous)

// play or pause the song
function playOrPause() {
    isPlaying == false ? playSong() : pauseSong()
}
function playSong() {
    isPlaying = true;
    playButton.classList.replace('fa-play', 'fa-pause');
    audio.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playButton.classList.replace('fa-pause', 'fa-play');
    audio.pause();
}
playButton.addEventListener("click", playOrPause)


//audio is ready to be played
audio.addEventListener("loadedmetadata", () => {

    song_duration.innerHTML = convertHMS(audio.duration)
    songDuration = audio.duration
    playSong()

})
audio.addEventListener("ended", () => {
    if (curentSongIndex < songs.length - 1) { nextSong()
    }else{
        playOrPause()
    }
})

//conver secondes to hh:mm:ss format
function convertHMS(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }

    if (hours == 0) { return minutes + ':' + seconds; }
    return hours + ':' + minutes + ':' + seconds;// Return is HH : MM : SS
}

//add song artist ,title and picture
function loadMetadata() {
    jsmediatags.read(songs[curentSongIndex], {
        onSuccess: function (tag) {
            var tags = tag.tags;
            songTitle.innerHTML = tags.title;
            artist.innerHTML = tags.artist
            var image = tags.picture;
            if (image) {
                var base64String = "";
                for (var i = 0; i < image.data.length; i++) {
                    base64String += String.fromCharCode(image.data[i]);
                }
                var base64 = "data:" + image.format + ";base64," +
                    window.btoa(base64String);
                document.getElementById('cover').setAttribute('src', base64);
            } 
        }
    });
}