const songs = [
  {
    title: "Song 1",
    artist: "Artist 1",
    src: "songs/song1.mp3",
    cover: "images/cover1.jpg"
  },
  {
    title: "Song 2",
    artist: "Artist 2",
    src: "songs/song2.mp3",
    cover: "images/cover2.jpg"
  },
  {
    title: "Song 3",
    artist: "Artist 3",
    src: "songs/song3.mp3",
    cover: "images/cover3.jpg"
  }
];

const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const playlist = document.getElementById("playlist");

let currentSong = 0;
let isPlaying = false;

function loadSong(index) {
  const song = songs[index];

  audio.src = song.src;
  cover.src = song.cover;
  title.textContent = song.title;
  artist.textContent = song.artist;

  document.querySelectorAll("#playlist li").forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}

function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
}

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

nextBtn.addEventListener("click", () => {
  currentSong++;

  if (currentSong >= songs.length) {
    currentSong = 0;
  }

  loadSong(currentSong);
  playSong();
});

prevBtn.addEventListener("click", () => {
  currentSong--;

  if (currentSong < 0) {
    currentSong = songs.length - 1;
  }

  loadSong(currentSong);
  playSong();
});

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;

    currentTime.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(audio.duration);
  }
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("ended", () => {
  currentSong++;

  if (currentSong >= songs.length) {
    currentSong = 0;
  }

  loadSong(currentSong);
  playSong();
});

function formatTime(time) {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);

  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

document.querySelectorAll("#playlist li").forEach((item, index) => {
  item.addEventListener("click", () => {
    currentSong = index;
    loadSong(currentSong);
    playSong();
  });
});

loadSong(currentSong);
audio.volume = 1;