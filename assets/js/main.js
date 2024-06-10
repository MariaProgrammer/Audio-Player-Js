const player = document.querySelector('.player'),
      prevBtn = document.querySelector('.prev'),
      playBtn = document.querySelector('.play'),  
      nextBtn = document.querySelector('.next'), 
      audio = document.querySelector('.audio'),
      progressContainer = document.querySelector('.progress__container'),
      progress = document.querySelector('.progress'),
      title = document.querySelector('.song'),      
      imgSrc = document.querySelector('.img__src'),
      coverImg = document.querySelector('.cover__img')

//названия песен
const songs = ['Bud_schastliv', 'Mne_tverdyat', 'kak_zdorovo']

// Песня по умолчанию
let songIndex = 0

function loadSong(song) {
title.innerHTML = song
audio.src = `./assets/audio/${song}.mp3`
coverImg.src = `./assets/images/cover${songIndex + 1}.png`
}

loadSong(songs[songIndex])

//Play

function playSong() {
    player.classList.add('play')
    coverImg.classList.add('active')
    imgSrc.src = './assets/images/stop.svg'
    audio.play()
}


//Pause

function pauseSong() {
    player.classList.remove('play')
    coverImg.classList.remove('active')
    imgSrc.src = './assets/images/play.svg'
    audio.pause()
}

playBtn.addEventListener('click', () => {
    const isPlaying = player.classList.contains('play')
    if(isPlaying) {
        pauseSong()
    } else {
        playSong()  
    }
})

//Next song

function nextSong() {
    songIndex++
    
    if(songIndex>songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}
function prevSong() {
    songIndex--;
    
    if(songIndex < 0) {
        songIndex = songs.length -1
    }
    loadSong(songs[songIndex])
    playSong()
}

nextBtn.addEventListener('click',  nextSong)
prevBtn.addEventListener('click',  prevSong)

// Progress bar

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPersent = (currentTime / duration) * 100 
    
    progress.style.width = `${progressPersent}%`
    

}
audio.addEventListener('timeupdate', updateProgress)

//set progress

function setProgress(e) {
    const widthP = this.clientWidth
    const clickX = e.offsetX
    const currDuration = audio.duration
    audio.currentTime = (clickX / widthP) * currDuration
}

progressContainer.addEventListener('click', setProgress)

// Autoplay

audio.addEventListener('ended', nextSong)