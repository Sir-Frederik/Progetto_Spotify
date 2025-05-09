const Url = "https://deezerdevs-deezer.p.rapidapi.com/search?limit=8&q=";

const divInfoArtist = document.getElementById("titleInf");
const nomeArtista = document.getElementById("nomeArtista");
const imgSong = document.getElementById("album");
const songId = document.getElementById("song");
const imgSelection = document.getElementById("imgSelection");
const imgSelectionSmall = document.getElementById("imgSelectionSmall");
const nameBestof = document.getElementById("nameBestof");

const query = new URLSearchParams(window.location.search).get("artistID");

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

fetch(Url + query, {
  headers: { "Content-Type": "application/json", "x-rapidapi-key": token, "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com" },
})
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    console.log(res);
    return res.json();
  })
  .then((object) => {
    const arraySongs = object.data;
    console.log(arraySongs);
    divInfoArtist.style.backgroundImage = `url(${arraySongs[0].artist.picture_big})`;
    divInfoArtist.style.backgroundSize = "cover";
    divInfoArtist.style.backgroundPosition = "";
    divInfoArtist.style.height = "300px";
    divInfoArtist.style.width = "100%";
    nomeArtista.innerText = arraySongs[0].artist.name;
    imgSelection.src = arraySongs[0].album.cover_medium;
    // imgSelectionSmall.src = arraySongs[0].artist.picture_small;
    nameBestof.innerText = " BEST OF " + arraySongs[0].artist.name.toUpperCase();
  })
  .catch((err) => console.error("Errore nel caricamento prodotti:", err));

fetch(Url + query, {
  method: "GET",
  headers: { "Content-Type": "application/json", "x-rapidapi-key": token, "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com" },
})
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  })
  .then((objects) => {
    const containers = document.getElementById("contenitore");
    const arraySongs = objects.data;

    containers.innerHTML = "";

    arraySongs.forEach((song, index) => {
      containers.innerHTML += `
        <div id="track" class="col-xxl-1 col-lg-1 col-md-1 col-1 text-center">${index + 1}</div>
        <div class="col-xxl-2 col-lg-2 col-md-3 col-4 gy-3">
          <img src="${song.album.cover_medium}" alt="album" id="album" style="width: 80px; height: 80px; object-fit: cover" />
        </div>
        <div id="song" class="col-xxl-5 col-lg-3 col-md-3 col-7 align-middle">${song.title}</div>
        <div id="ascolti" class="col-xxl-2 col-lg-3 col-md-3 col-3 d-none d-md-block">${song.rank}</div>
        <div id="timeSong" class="col-xxl-2 col-lg-3 col-md-2 col-3 d-none d-md-block">${formatTime(song.duration)}</div> 
      `;
    });
  })
  .catch((err) => console.error("Errore nel caricamento prodotti:", err));

fetch(Url + query, {
  method: "GET",
  headers: { "Content-Type": "application/json", "x-rapidapi-key": token, "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com" },
})
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  })
  .then((objects) => {
    const containersAlbum = document.getElementById("contenitoreAlbum");
    const arrayAlbum = objects.data;

    containersAlbum.innerHTML = "";

    arrayAlbum.forEach((title, index) => {
      containersAlbum.innerHTML += ` <div class="col-xxl-3 col-lg-3 col-md-6 col-6">
                  <div id="cardDisco" class="card me-3 text-white" style="max-width: 230px">
                    <img
                      id="imageCard"
                      src="${title.album.cover_medium}"
                      class="img-fluid rounded mb-2"
                      style=" object-fit: cover"
                    />
                    <p id="nameSong" class="fw-semibold mb-1 ps-3">${title.album.title}</p>
                    <p id="nameAlbum" class="text-muted small mb-2 ps-3">Album</p>
                  </div>
                </div>`;
    });
  })
  .catch((err) => console.error("Errore nel caricamento prodotti:", err));
