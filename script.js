let songs = [];
let filtered = [];
let currentIndex = -1;
let playing = false;

/* Remove skeleton and render */
setTimeout(() => {
  document.getElementById("skeleton")?.remove();
  render();
}, 1200);

/* Render playlist */
function render() {
  const list = document.getElementById("playlist");
  list.innerHTML = "";

  // ✅ AUTO-SELECT FIRST SONG
  if (currentIndex === -1 && filtered.length > 0) {
    currentIndex = 0;
  }

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

  if (!name || songs.includes(name)) return;

  songs.push(name);
  filtered = [...songs];

  if (currentIndex === -1) currentIndex = 0;

  input.value = "";
  render();
}

/* Select song */
function selectSong(i) {
  currentIndex = i;
  playing = true;
  document.getElementById("playBtn").innerText = "⏸";
  render();
}

/* Delete song (FIXED) */
function deleteSong() {
  if (filtered.length === 0 || currentIndex < 0) return;

  const songToDelete = filtered[currentIndex];

  // Remove from main list
  songs = songs.filter(song => song !== songToDelete);

  // Update filtered list
  filtered = [...songs];

  // Fix index
  if (filtered.length === 0) {
    currentIndex = -1;
  } else {
    currentIndex = currentIndex % filtered.length;
  }

  render();
}

/* Play / Pause */
function playPause() {
  playing = !playing;
  document.getElementById("playBtn").innerText =
    playing ? "⏸" : "▶️";
}

/* Next */
function next() {
  if (!filtered.length) return;
  currentIndex = (currentIndex + 1) % filtered.length;
  render();
}

/* Previous */
function prev() {
  if (!filtered.length) return;
  currentIndex =
    (currentIndex - 1 + filtered.length) % filtered.length;
  render();
}

/* Search */
function searchSong() {
  const q = document.getElementById("searchInput").value.toLowerCase();
  filtered = songs.filter(song =>
    song.toLowerCase().includes(q)
  );
  currentIndex = filtered.length ? 0 : -1;
  render();
}

/* Expand Now Playing */
function toggleExpand() {
  document
    .querySelector(".now-playing")
    .classList.toggle("expanded");
}
