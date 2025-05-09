const UrlPlaylist = "https://deezerdevs-deezer.p.rapidapi.com/playlist/";
// const UrlAlbum = "https://deezerdevs-deezer.p.rapidapi.com/playlist/";

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
  fetch("/assets/json/albums.json", {
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
        const glide = document.createElement("div");
        glide.className = "glide";
        const glideTrack = document.createElement("div");
        glideTrack.className = "glide__track";
        glideTrack.setAttribute("data-glide-el", "track");
        const glideUl = document.createElement("ul");
        glideUl.className = "glide__slides";
        console.log(" CREO Carosello: " + carouselElement);

        const createRandomId = function () {
          let arrayLength = data.albums.length;
          for (let i = 0; i < arrayLength; i++) {
            arrayIdAlbum.push(i); //pushare id estratto dall'indice
          }
          // console.log("indici array totali =" + arrayIdAlbum);

          for (let i = 0; i < 10; i++) {
            const index = Math.floor(Math.random() * arrayIdAlbum.length);
            randomIndices.push(index);
            // console.log("indice Scelto= " + index);
            arrayIdAlbum.splice(index, 1); //randomizzare un id valido tra 0  ed un a length
            // console.log("indici array rimasti =" + arrayIdAlbum);
          }
          console.log("indici random= " + randomIndices);
        };

        createRandomId();
        carouselElement.innerHTML = "";
        //da qua inizia il forEach in cui devo ciclare gli elementi li del grid
        //FOREACH
        console.log("Inizio ForEach");
        randomIndices.forEach((index) => {
          console.log("indice da stampare: " + index);
          const album = data.albums[index].tracks.data[0].album;
          const artist = data.albums[index].tracks.data[0].artist;
          const glideLi = document.createElement("li");

          glideLi.className = "glide__slide";
          console.log(`GlideList di indice ${index} di ${carouselElement} fatta`);
          const glideImg = document.createElement("img");
          glideImg.className = "rounded-3";
          glideImg.src = `${album.cover_medium}`;
          glideImg.alt = `album cover  of ${album.cover_medium}`;

          // evento della lista creato, ora ci metto gli'event listener
          glideImg.addEventListener("click", function () {
            window.location.href = `./album.html?albumID=${data.albums[index].id}`;
          });
          console.log(`Album cover + event di indice ${index} di ${carouselElement} fatta`);
          //creo le altre  info dell'album
          const albumTitle = document.createElement("h6");
          albumTitle.innerText = `${album.title}`;
          albumTitle.className = "mt-2";
          const albumInfo = document.createElement("p");
          const albumYear = document.createElement("span");
          albumInfo.innerText = `${artist.name}`;
          albumInfo.className = "roles";
          albumYear.innerText = "Album";
          albumYear.className = "brano";
          console.log(`Titolo + autore di ${index} di ${carouselElement} fatta`);

          albumInfo.appendChild(albumYear);

          glideLi.appendChild(glideImg);
          glideLi.appendChild(albumTitle);

          glideLi.appendChild(albumInfo);
          console.log(`Inseriti elementi Album  di  ${index} di ${carouselElement} `);

          glideUl.appendChild(glideLi);
          console.log(`Inserita Lista  ${index} di ${carouselElement} `);

          /*          const card = document.createElement("div");
       card.className = "carousel-card me-3 text-white";
          card.innerHTML = `<img src="${album.cover_medium}" class="img-fluid rounded mb-2"  />
                  <p class="fw-semibold mb-1 text-truncate">${album.title}</p>
                  <p class="text-muted small mb-0 text-truncate">${artist.name || "Artista sconosciuto"}</p>
                                                    `; */
        });

        glideTrack.appendChild(glideUl);
        console.log(`Ciclo finito,   creata UL di  ${carouselElement}  `);
        // glide.appendChild(album);  qui inserire nome album
        glide.appendChild(glideTrack);
        carouselElement.appendChild(glide);
        console.log(`Inserito tutto nel carousel  ${carouselElement}  `);

        new Glide(document.querySelector(".glide"), {
          type: "carousel",
          perView: 6,
          breakpoints: {
            1200: {
              perView: 4,
            },
            992: {
              perView: 3,
            },
            768: {
              perView: 2,
            },
            480: {
              perView: 1,
            },
          },
        }).mount();
      };

      createCarousel(carousel1);
      console.log(" CAROSELLO 2");
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
