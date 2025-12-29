let songs = [];
let filtered = [];
let currentIndex = -1;
let playing = false;

/* Remove skeleton after load */
setTimeout(() => {
  const sk = document.getElementById("skeleton");
  if (sk) sk.remove();
  render();
}, 800);

/* Render playlist */
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

/* Add song */
function addSong() {
  const input = document.getElementById("songInput");
  const name = input.value.trim();

  if (!name) return;
  if (songs.includes(name)) {
    alert("Song already exists");
    return;
  }

  songs.push(name);
  filtered = [...songs];

  if (currentIndex === -1) currentIndex = 0;

  input.value = "";
  render();
}

/* Delete current song */
function deleteSong() {
  if (currentIndex < 0 || songs.length === 0) return;

  const songToDelete = filtered[currentIndex];
  songs = songs.filter(s => s !== songToDelete);
  filtered = [...songs];

  if (filtered.length === 0) {
    currentIndex = -1;
  } else {
    currentIndex = currentIndex % filtered.length;
  }

  render();
}

/* Select song */
function selectSong(i) {
  currentIndex = i;
  playing = true;
  document.getElementById("playBtn").innerText = "⏸";
  render();
}

/* Play / Pause */
function playPause() {
  if (currentIndex < 0) return;

  playing = !playing;
  document.getElementById("playBtn").innerText =
    playing ? "⏸" : "▶️";
}

/* Next song */
function next() {
  if (filtered.length === 0) return;
  currentIndex = (currentIndex + 1) % filtered.length;
  render();
}

/* Previous song */
function prev() {
  if (filtered.length === 0) return;
  currentIndex =
    (currentIndex - 1 + filtered.length) % filtered.length;
  render();
}

/* Search song */
function searchSong() {
  const q = document.getElementById("searchInput").value.toLowerCase();

  filtered = songs.filter(song =>
    song.toLowerCase().includes(q)
  );

  currentIndex = filtered.length ? 0 : -1;
  render();
}

/* Expand now playing */
function toggleExpand() {
  document
    .querySelector(".now-playing")
    .classList.toggle("expanded");
}
