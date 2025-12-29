let songs = [];
let filtered = [];
let currentIndex = -1;
let playing = false;

setTimeout(() => {
  document.getElementById("skeleton")?.remove();
  render();
}, 1200);

function render() {
  const list = document.getElementById("playlist");
  list.innerHTML = "";

  filtered.forEach((song, i) => {
    const div = document.createElement("div");
    div.className = "song" + (i === currentIndex ? " active" : "");
    div.onclick = () => selectSong(i);

    div.innerHTML = `
      <span class="play-overlay">▶</span>
      <div>
        <div class="song-title">${song}</div>
        <div class="song-artist">Unknown Artist</div>
      </div>
      <div class="song-time">4:20</div>
      <div class="like">♡</div>
    `;
    list.appendChild(div);
  });

  document.getElementById("currentSong").innerText =
    currentIndex >= 0 ? filtered[currentIndex] : "No song selected";
}

function addSong() {
  const input = document.getElementById("songInput");
  if (!input.value || songs.includes(input.value)) return;
  songs.push(input.value);
  filtered = songs;
  if (currentIndex === -1) currentIndex = 0;
  input.value = "";
  render();
}

function selectSong(i) {
  currentIndex = i;
  playing = true;
  document.getElementById("playBtn").innerText = "⏸";
  render();
}

function playPause() {
  playing = !playing;
  document.getElementById("playBtn").innerText = playing ? "⏸" : "▶️";
}

function next() {
  if (!songs.length) return;
  currentIndex = (currentIndex + 1) % filtered.length;
  render();
}

function prev() {
  if (!songs.length) return;
  currentIndex = (currentIndex - 1 + filtered.length) % filtered.length;
  render();
}

function searchSong() {
  const q = document.getElementById("searchInput").value.toLowerCase();
  filtered = songs.filter(s => s.toLowerCase().includes(q));
  currentIndex = filtered.length ? 0 : -1;
  render();
}

function toggleExpand() {
  document.querySelector(".now-playing").classList.toggle("expanded");
}
