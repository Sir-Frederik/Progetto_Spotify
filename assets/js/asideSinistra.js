const asideUrl = "https://deezerdevs-deezer.p.rapidapi.com/search?q=playlist";

const deezerOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": token,
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

async function loadPlaylists() {
  try {
    const response = await fetch(asideUrl, deezerOptions);
    const data = await response.json();

    console.log("Risposta completa dell'API:", data);

    const results = data.data;

    if (!results) {
      throw new Error("La risposta API non contiene `data`.");
    }

    const playlistList = document.getElementById("playlist-list");
    playlistList.innerHTML = "";

    results.slice(0, 10).forEach((item) => {
      const li = document.createElement("li");
      li.className = "list-group-item border-0 p-2 ps-0";

      li.innerHTML = `
        <div class="d-flex align-items-center">
          <div class="me-3 flex-shrink-0">
            <img class="img-fluid rounded-3" src="${item.album.cover_medium}" style="width: 80px; height: 80px; object-fit: cover" />
          </div>
          <div class="flex-grow-1">
            <p class="fw-bold mb-1">${item.title}</p>
            <div class="text-muted small"><i class="bi bi-pin me-1"></i>${item.artist.name}</div>
          </div>
        </div>
      `;

      playlistList.appendChild(li);
    });
  } catch (error) {
    console.error("Errore durante il caricamento delle playlist:", error);
  }
}

loadPlaylists();
