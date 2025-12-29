let songs = ["Perfect", "Believer", "Faded"];
let index = 0;

function playSong(name) {
  document.getElementById("currentSong").innerText = name;
  index = songs.indexOf(name);
  updateActive();
}

function play() {
  alert("Playing: " + songs[index]);
}

function next() {
  index = (index + 1) % songs.length;
  document.getElementById("currentSong").innerText = songs[index];
  updateActive();
}

function prev() {
  index = (index - 1 + songs.length) % songs.length;
  document.getElementById("currentSong").innerText = songs[index];
  updateActive();
}

function updateActive() {
  document.querySelectorAll(".song").forEach((el, i) => {
    el.classList.toggle("active", i === index);
  });
}
