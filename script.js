let songs = [];
let currentIndex = -1;

function render() {
  const list = document.getElementById("playlist");
  list.innerHTML = "";

  songs.forEach((song, i) => {
    const div = document.createElement("div");
    div.className = "song" + (i === currentIndex ? " active" : "");
    div.innerText = song;
    div.onclick = () => selectSong(i);
    list.appendChild(div);
  });

  document.getElementById("currentSong").innerText =
    currentIndex >= 0 ? songs[currentIndex] : "No song";
}

function addSong() {
  const name = document.getElementById("songInput").value.trim();
  if (!name || songs.includes(name)) return;
  songs.push(name);
  if (currentIndex === -1) currentIndex = 0;
  document.getElementById("songInput").value = "";
  render();
}

function selectSong(i) {
  currentIndex = i;
  render();
}

function next() {
  if (songs.length === 0) return;
  currentIndex = (currentIndex + 1) % songs.length;
  render();
}

function prev() {
  if (songs.length === 0) return;
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  render();
}

function deleteSong() {
  if (currentIndex < 0) return;
  songs.splice(currentIndex, 1);
  if (songs.length === 0) currentIndex = -1;
  else currentIndex %= songs.length;
  render();
}
