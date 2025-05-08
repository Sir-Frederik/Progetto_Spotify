const toggleLibreriaBtn = document.getElementById("toggleLibreriaBtn");
const libreriaAside = document.querySelector("aside");

toggleLibreriaBtn.addEventListener("click", () => {
  libreriaAside.classList.toggle("d-none");
});

const slider = document.getElementById("customRange2");

slider.addEventListener("input", function () {
  const value = ((this.value - this.min) / (this.max - this.min)) * 100;
  this.style.background = `linear-gradient(to right, #28a745 ${value}%, #ccc ${value}%)`;
});

const albumId = new URLSearchParams(window.location.search).get("albumID");
const url = `https://deezerdevs-deezer.p.rapidapi.com/album/${albumId}`;
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": token,
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

fetch(url, options)
  .then((response) => {
    if (!response.ok) throw new Error("Errore HTTP: " + response.status);
    return response.json();
  })
  .then((data) => {
    const section = document.getElementById("albumSection");

    const artistImage = new Image();
    artistImage.src = data.artist.picture_big;

    artistImage.onload = function () {
      section.innerHTML = `
        <div class="mb-3 mb-md-0 container-fluid p-5 rounded" style="background-color: #121212;">
          <div class="p-5 mb-4" style="position: relative; overflow: hidden; border-radius: 10px;">
            <div style="background-image: url('${
              data.artist.picture_big
            }'); background-size: cover; background-position: center; filter: blur(8px); position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></div>
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.4);"></div>
            <div class="position-relative z-index-1 d-flex flex-column flex-md-row align-items-center text-light">
              <img src="${data.cover_medium}" alt="${data.title}" class="me-4 rounded img-fluid" style="width: 120px; height: 120px; object-fit: cover;">
              <div class="text-center text-md-start mt-3 mt-md-0">
                <h1 class="fw-bold mb-1" style="font-size: 1.5rem;">${data.title}</h1>
                <h4 class="fs-6 mb-0 d-flex align-items-center justify-content-center justify-content-md-start">
                  <img src="${data.artist.picture}" alt="${
        data.artist.name
      }" class="me-2" style="width: 30px; height: 30px; object-fit: cover; border-radius: 50%;">
                  ${data.artist.name}
                </h4>
              </div>
            </div>
          </div>

          <div class="row mb-5">
            <div class="col-6 d-flex align-items-center">
              <button data-testid="play-button" aria-label="Play" data-encore-id="buttonPrimary" data-is-icon-only="true" class="play-button">
                <span class="button-inner">
                  <span aria-hidden="true" class="button-icon-wrapper">
                    <svg data-encore-id="icon" role="img" aria-hidden="true" class="play-icon" viewBox="0 0 24 24">
                      <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                    </svg>
                  </span>
                </span>
              </button>
              <i class="bi bi-plus-circle ms-3"></i>
              <i class="bi bi-three-dots ms-3"></i>
            </div>
            <div class="col-6 d-flex align-items-center justify-content-end">
              <p class="mb-0" style="font-size: 0.8rem;">Elenco</p>
              <i class="bi bi-list-ul ms-2" style="font-size: 1.3rem;"></i>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-6 d-flex align-items-center">
              <p class="mb-0"># Titolo</p>
            </div>
            <div class="col-6 d-flex justify-content-end align-items-center">
              <i class="bi bi-clock ms-3"></i>
            </div>
          </div>

          <hr>

          <ul class="list-unstyled">
            ${data.tracks.data
              .map(
                (track, index) => `
                  <li class="track-item d-flex justify-content-between align-items-center mb-2 p-2 bg-transparent">
                    <div>
                      <span class="text-light">#${index + 1} - ${track.title} </br>
                        <span style="opacity: 0.5;">${data.artist.name}</span>
                      </span>
                    </div>
                  </li>
                `
              )
              .join("")}
          </ul>

          <hr>

          <div class="row">
            <div class="col-12 col-md-8 d-flex justify-content-start mb-5 mb-md-0">
              <a class="me-3" style="font-size: 0.8rem; text-decoration: none; color: white; cursor: pointer;">Informazioni legali</a>
              <a class="me-3" style="font-size: 0.8rem; text-decoration: none; color: white; cursor: pointer;">Impostazioni cookie</a>
              <a class="me-3" style="font-size: 0.8rem; text-decoration: none; color: white; cursor: pointer;">Accessibilità</a>
            </div>
            <div class="col-12 col-md-4 d-flex justify-content-end">
              <p style="font-size: 0.8rem;">&copy 2025 Spotify AB</p>
            </div>
          </div>
        </div>
      `;
    };
  })
  .catch((error) => {
    console.error("Errore nel caricamento dell'album:", error);
    document.getElementById("albumSection").innerHTML = `
      <div class="container alert alert-danger" role="alert">
        Impossibile caricare i dati dell'album.
      </div>
    `;
  });
