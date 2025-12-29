let songs = [];
let filtered = [];
let currentIndex = -1;
let playing = false;

/* Remove skeleton */
setTimeout(() => {
  const sk = document.getElementById("skeleton");
  if (sk) sk.remove();
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
      ${song}
      ${i === currentIndex && playing ? `
        <div class="eq">
          <span></span><span></span><span></span>
        </div>` : ""}
    `;
    list.appendChild(div);
  });

  document.getElementById("currentSong").innerText =
    currentIndex >= 0 ? filtered[currentIndex] : "No song selected";
}

function addSong() {
  const input = document.getElementById("songInput");
  const name = input.value.trim();
  if (!name || songs.includes(name)) return;

  songs.push(name);
  filtered = songs;
  if (currentIndex === -1) currentIndex = 0;
  input.value = "";
  render();
}

function deleteSong() {
  if (currentIndex < 0) return;
  songs.splice(currentIndex, 1);
  filtered = songs;
  currentIndex = songs.length ? 0 : -1;
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
  render();
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
