const UrlPlaylist = "https://deezerdevs-deezer.p.rapidapi.com/playlist/";
const UrlAlbum = "https://deezerdevs-deezer.p.rapidapi.com/playlist/";

let query = "";

const arrayIdPlaylist = [98, 118, 125, 55, 123, 13, 86, 45];
let arrayIdAlbum = [];
const rowPlaylist = document.querySelector(".rowPlaylist ");
const carousel1 = document.querySelector(".carousel1 ");
const carousel2 = document.querySelector(".carousel2 ");
let randomIndices = [];

const searchAndShowPlaylist = () => {
  arrayIdPlaylist.forEach((id) => {
    query = id;
    console.log(query);
    console.log(UrlPlaylist + query);

    fetch(UrlPlaylist + query, {
      headers: {
        "x-rapidapi-key": token,
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      },
    })
      .then((resp) => {
        console.log(resp);
        if (!resp.ok) {
          if (resp.status >= 500) {
            throw new Error("Errore lato server");
          } else {
            throw new Error("Errore nella ciaooo");
          }
        }
        return resp.json();
      })
      .then((playlist) => {
        const col = document.createElement("div");
        col.className = "col-3";
        col.innerHTML = `<div class="rapidAccess d-flex align-items-center">
                  <div class="me-3 flex-shrink-0">
                    <img class="img-fluid rounded-3" src= ${playlist.picture_small} style="width: 80px; height: 80px; object-fit: cover" />
                  </div>
                  <div class="flex-grow-1">
                    <p class="fw-bold mb-1 fs-6">${playlist.title}</p>
                  </div>
`;
        rowPlaylist.appendChild(col); //lavoare con la creaszione del contenuiiotre, non ogni singola card
        //   });
      })

      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  });
};
const searchAndShowAlbum = () => {
  fetch(" /assets/json/albums.json", {
    method: "GET",
  })
    .then((resp) => {
      if (!resp.ok) {
        if (resp.status >= 500) {
          throw new Error("Errore lato server");
        } else {
          throw new Error("Errore nella fetch");
        }
      }
      return resp.json();
    })
    .then((data) => {
      const createCarousel = function (carouselElement) {
        arrayIdAlbum = [];
        randomIndices = [];

        const createRandomId = function () {
          let arrayLength = data.albums.length;
          for (let i = 0; i < arrayLength; i++) {
            arrayIdAlbum.push(i); //pushare id estratto dall'indice
          }
          console.log("indici array totali =" + arrayIdAlbum);

          for (let i = 0; i < 10; i++) {
            const index = Math.floor(Math.random() * arrayIdAlbum.length);
            randomIndices.push(index);
            console.log("indice Scelto= " + index);
            arrayIdAlbum.splice(index, 1); //randomizzare un id valido tra 0  ed un a lengh
            console.log("indici array rimasti =" + arrayIdAlbum);
          }
          console.log("indici random= " + randomIndices);
        };

        createRandomId();
        carouselElement.innerHTML = "";
        randomIndices.forEach((index) => {
          console.log("indice da stampare: " + index);
          const card = document.createElement("div");
          card.className = "carousel-card me-3 text-white";
          card.innerHTML = `<img src="${data.albums[index].tracks.data[0].album.cover_medium}" class="img-fluid rounded mb-2"  />
                  <p class="fw-semibold mb-1">${data.albums[index].tracks.data[0].album.title}</p>
                  <p class="text-muted small mb-0">${data.albums[index].tracks.data[0].artist.name || "Artista sconosciuto"}</p>
                                                    `;
          carouselElement.appendChild(card);
        });
      };
      console.log("Creo carosello 1");
      createCarousel(carousel1);
      console.log("PROCEDO CON CAROSELLO 2");
      createCarousel(carousel2);
    })

    .catch((error) => {
      console.log(error);
      alert(error.message);
    });
};

window.onload = function () {
  rowPlaylist.innerHTML = "";

  searchAndShowPlaylist();
  searchAndShowAlbum();
};

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
