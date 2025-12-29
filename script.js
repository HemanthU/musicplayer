let songs = JSON.parse(localStorage.getItem("songs")) || [];
let liked = JSON.parse(localStorage.getItem("liked")) || {};
let recent = JSON.parse(localStorage.getItem("recent")) || [];
let currentIndex = songs.length ? 0 : -1;
let shuffle = false;
let repeat = 0; // 0 off, 1 one, 2 all
let playing = false;

const audio = document.getElementById("audioPlayer");

setTimeout(() => {
  document.getElementById("skeleton")?.remove();
  render();
}, 500);

function save() {
  localStorage.setItem("songs", JSON.stringify(songs));
  localStorage.setItem("liked", JSON.stringify(liked));
  localStorage.setItem("recent", JSON.stringify(recent));
}

function toast(msg) {
  const t = document.getElementById("toast");
  t.innerText = msg;
  t.style.display = "block";
  setTimeout(() => t.style.display = "none", 1500);
}

function render() {
  const list = document.getElementById("playlist");
  list.innerHTML = "";

  songs.forEach((song, i) => {
    const div = document.createElement("div");
    div.className = "song" + (i === currentIndex ? " active" : "");
    div.onclick = () => selectSong(i);

    div.innerHTML = `
      <span>${song}</span>
      <span class="like ${liked[song] ? 'liked' : ''}" onclick="toggleLike(event,'${song}')">♥</span>
    `;
    list.appendChild(div);
  });

  document.getElementById("currentSong").innerText =
    currentIndex >= 0 ? songs[currentIndex] : "No song";
}

function addSong() {
  const input = document.getElementById("songInput");
  if (!input.value || songs.includes(input.value)) return;
  songs.push(input.value);
  if (currentIndex === -1) currentIndex = 0;
  save();
  render();
  toast("Song added");
  input.value = "";
}

function deleteSong() {
  if (currentIndex < 0) return;
  songs.splice(currentIndex, 1);
  currentIndex = songs.length ? 0 : -1;
  save();
  render();
  toast("Song deleted");
}

function selectSong(i) {
  currentIndex = i;
  recent.unshift(songs[i]);
  recent = [...new Set(recent)].slice(0, 5);
  save();
  playSong();
}

function playSong() {
  if (currentIndex < 0) return;
  audio.src = `audio/${songs[currentIndex]}.mp3`;
  audio.play();
  playing = true;
  document.getElementById("playBtn").innerText = "⏸";
}

function playPause() {
  if (!audio.src) return;
  playing ? audio.pause() : audio.play();
  playing = !playing;
  document.getElementById("playBtn").innerText = playing ? "⏸" : "▶️";
}

function next() {
  if (!songs.length) return;
  if (shuffle) currentIndex = Math.floor(Math.random() * songs.length);
  else currentIndex = (currentIndex + 1) % songs.length;
  playSong();
}

function prev() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  playSong();
}

function toggleShuffle() {
  shuffle = !shuffle;
  toast(shuffle ? "Shuffle On" : "Shuffle Off");
}

function toggleRepeat() {
  repeat = (repeat + 1) % 3;
  toast(["Repeat Off","Repeat One","Repeat All"][repeat]);
}

audio.onended = () => {
  if (repeat === 1) playSong();
  else if (repeat === 2) next();
};

function searchSong() {
  const q = document.getElementById("searchInput").value.toLowerCase();
  songs = JSON.parse(localStorage.getItem("songs")) || [];
  songs = songs.filter(s => s.toLowerCase().includes(q));
  currentIndex = songs.length ? 0 : -1;
  render();
}

function toggleLike(e, song) {
  e.stopPropagation();
  liked[song] = !liked[song];
  save();
  render();
}

function toggleTheme() {
  document.body.classList.toggle("light");
}
