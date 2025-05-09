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
      const section = document.querySelector("section");

      const container = document.createElement("div");
      container.className = "mb-3 mb-md-0 container-fluid p-5 rounded";

      const header = document.createElement("div");
      header.className = "p-5 mb-4";
      header.style.position = "relative";
      header.style.overflow = "hidden";
      header.style.borderRadius = "10px";

      const background = document.createElement("div");
      background.style.backgroundImage = `url(${data.artist.picture_big})`;
      background.style.backgroundSize = "cover";
      background.style.backgroundPosition = "center";
      background.style.filter = "blur(8px)";
      background.style.position = "absolute";
      background.style.top = "0";
      background.style.left = "0";
      background.style.width = "100%";
      background.style.height = "100%";
      header.appendChild(background);

      const overlay = document.createElement("div");
      overlay.style.position = "absolute";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
      header.appendChild(overlay);

      const contentWrapper = document.createElement("div");
      contentWrapper.className = "position-relative z-index-1 d-flex flex-column flex-md-row align-items-center text-light";

      const imgCover = document.createElement("img");
      imgCover.src = data.cover_medium;
      imgCover.alt = data.title;
      imgCover.className = "me-4 rounded img-fluid";
      imgCover.style.width = "120px";
      imgCover.style.height = "120px";
      imgCover.style.objectFit = "cover";
      contentWrapper.appendChild(imgCover);

      const textWrapper = document.createElement("div");
      textWrapper.className = "text-center text-md-start mt-3 mt-md-0";

      const h1 = document.createElement("h1");
      h1.className = "fw-bold mb-1";
      h1.style.fontSize = "1.5rem";
      h1.textContent = data.title;
      textWrapper.appendChild(h1);

      const h4 = document.createElement("h4");
      h4.className = "fs-6 mb-0 d-flex align-items-center justify-content-center justify-content-md-start brano";

      const imgArtist = document.createElement("img");
      imgArtist.src = data.artist.picture;
      imgArtist.alt = data.artist.name;
      imgArtist.className = "me-2";
      imgArtist.style.width = "30px";
      imgArtist.style.height = "30px";
      imgArtist.style.objectFit = "cover";
      imgArtist.style.borderRadius = "50%";
      h4.appendChild(imgArtist);

      h4.appendChild(document.createTextNode(data.artist.name));
      textWrapper.appendChild(h4);
      contentWrapper.appendChild(textWrapper);

      header.appendChild(contentWrapper);
      container.appendChild(header);

      const controlsRow = document.createElement("div");
      controlsRow.className = "row mb-5";

      const leftControls = document.createElement("div");
      leftControls.className = "col-6 d-flex align-items-center";

      const playButton = document.createElement("button");
      playButton.className = "play-button";
      playButton.setAttribute("data-testid", "play-button");
      playButton.setAttribute("aria-label", "Play");
      playButton.setAttribute("data-encore-id", "buttonPrimary");
      playButton.setAttribute("data-is-icon-only", "true");

      const spanButtonInner = document.createElement("span");
      spanButtonInner.className = "button-inner";

      const spanIconWrapper = document.createElement("span");
      spanIconWrapper.className = "button-icon-wrapper";
      spanIconWrapper.setAttribute("aria-hidden", "true");

      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("role", "img");
      svg.classList.add("play-icon");

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", "m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z");
      svg.appendChild(path);
      spanIconWrapper.appendChild(svg);
      spanButtonInner.appendChild(spanIconWrapper);
      playButton.appendChild(spanButtonInner);
      leftControls.appendChild(playButton);

      ["plus-circle", "three-dots"].forEach((iconName) => {
        const icon = document.createElement("i");
        icon.className = `bi bi-${iconName} ms-3`;
        leftControls.appendChild(icon);
      });

      const rightControls = document.createElement("div");
      rightControls.className = "col-6 d-flex align-items-center justify-content-end";

      const elencoText = document.createElement("p");
      elencoText.className = "mb-0";
      elencoText.style.fontSize = "0.8rem";
      elencoText.textContent = "Elenco";
      rightControls.appendChild(elencoText);

      const iconList = document.createElement("i");
      iconList.className = "bi bi-list-ul ms-2";
      iconList.style.fontSize = "1.3rem";
      rightControls.appendChild(iconList);

      controlsRow.appendChild(leftControls);
      controlsRow.appendChild(rightControls);
      container.appendChild(controlsRow);

      const trackHeader = document.createElement("div");
      trackHeader.className = "row mb-3";

      const leftHeader = document.createElement("div");
      leftHeader.className = "col-6 d-flex align-items-center";
      const pTitle = document.createElement("p");
      pTitle.className = "mb-0";
      pTitle.textContent = "# Titolo";
      leftHeader.appendChild(pTitle);

      const rightHeader = document.createElement("div");
      rightHeader.className = "col-6 d-flex justify-content-end align-items-center";
      const clockIcon = document.createElement("i");
      clockIcon.className = "bi bi-clock ms-3";
      rightHeader.appendChild(clockIcon);

      trackHeader.appendChild(leftHeader);
      trackHeader.appendChild(rightHeader);
      container.appendChild(trackHeader);

      container.appendChild(document.createElement("hr"));

      const trackList = document.createElement("ul");
      trackList.className = "list-unstyled";

      data.tracks.data.forEach((track, index) => {
        const li = document.createElement("li");
        li.className = "track-item d-flex justify-content-between align-items-center mb-2 p-2 bg-transparent";

        const span = document.createElement("span");
        span.className = "text-light";
        span.innerHTML = `#${index + 1} - ${track.title} <br><span style="opacity: 0.5;">${data.artist.name}</span>`;
        li.appendChild(span);

        trackList.appendChild(li);
      });
      container.appendChild(trackList);

      container.appendChild(document.createElement("hr"));

      const footerRow = document.createElement("div");
      footerRow.className = "row";

      const leftFooter = document.createElement("div");
      leftFooter.className = "col-12 col-md-8 d-flex justify-content-start mb-5 mb-md-0";
      ["Informazioni legali", "Impostazioni cookie", "Accessibilità"].forEach((text) => {
        const a = document.createElement("a");
        a.className = "me-3";
        a.style.fontSize = "0.8rem";
        a.style.textDecoration = "none";
        a.style.color = "white";
        a.style.cursor = "pointer";
        a.textContent = text;
        leftFooter.appendChild(a);
      });

      const rightFooter = document.createElement("div");
      rightFooter.className = "col-12 col-md-4 d-flex justify-content-end";
      const copyright = document.createElement("p");
      copyright.style.fontSize = "0.8rem";
      copyright.innerHTML = "&copy; 2025 Spotify AB";
      rightFooter.appendChild(copyright);

      footerRow.appendChild(leftFooter);
      footerRow.appendChild(rightFooter);
      container.appendChild(footerRow);

      section.innerHTML = "";
      section.appendChild(container);

      h4.addEventListener("click", function () {
        window.location.href = `./artist_page.html?artistID=${data.artist.name}`;
      });
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
