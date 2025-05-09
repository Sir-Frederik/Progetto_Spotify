// const UrlPlaylist = "https://deezerdevs-deezer.p.rapidapi.com/playlist/";
// const UrlAlbum = "https://deezerdevs-deezer.p.rapidapi.com/playlist/";

// let query = "";

// const arrayIdPlaylist = [98, 118, 125, 55, 123, 13, 86, 45];
let arrayIdAlbum = [];
const rowPlaylist = document.querySelector(".rowPlaylist");
const carousel1 = document.querySelector(".carousel1");
const carousel2 = document.querySelector(".carousel2");
let globalAlbumData;

let randomIndices = [];

const searchAndShowLittleAlbum = () => {
  for (let i = 0; i < 11; i++) {
    fetch("/assets/json/albums.json", {
      /*   headers: {
        "x-rapidapi-key": token,
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      }, */
    })
      .then((resp) => {
        console.log(resp);
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
        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-xxl-3 littleCard";
        let littleAlbum = data.albums[i].tracks.data[0].album;
        col.innerHTML = `<div class="rapidAccess d-flex align-items-center">
                  <div class="me-3 flex-shrink-0">
                    <img class="img-fluid rounded-3" src= ${littleAlbum.cover_small} style="width: 80px; height: 80px; object-fit: cover" />
                  </div>
                  <div class="flex-grow-1">
                    <p class="fw-bold mb-1 fs-6">${littleAlbum.title}</p>
                  </div>
`;
        col.addEventListener("click", function () {
          window.location.href = `./album.html?albumID=${data.albums[i].id}`;
        });
        rowPlaylist.appendChild(col);
        //   });
      })

      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  }
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
      globalAlbumData = [...data.albums];

      const createCarousel = function (carouselElement) {
        const glide = document.createElement("div");
        glide.className = "glide";

        const glideTrack = document.createElement("div");
        glideTrack.className = "glide__track";
        glideTrack.setAttribute("data-glide-el", "track");

        const glideUl = document.createElement("ul");
        glideUl.className = "glide__slides";

        console.log("CREO Carosello: " + carouselElement);

        // Seleziona 8 elementi casuali univoci e li rimuove da globalAlbumData
        const selectedAlbums = [];
        for (let i = 0; i < 8 && globalAlbumData.length > 0; i++) {
          const randomIndex = Math.floor(Math.random() * globalAlbumData.length);
          selectedAlbums.push(globalAlbumData.splice(randomIndex, 1)[0]);
        }

        carouselElement.innerHTML = "";

        console.log("Inizio ForEach");
        selectedAlbums.forEach((albumData, index) => {
          const album = albumData.tracks.data[0].album;
          const artist = albumData.tracks.data[0].artist;

          const glideLi = document.createElement("li");
          glideLi.className = "glide__slide";
          console.log(`GlideList di indice ${index} di ${carouselElement} fatta`);

          const glideImg = document.createElement("img");
          glideImg.className = "rounded-3";
          glideImg.src = `${album.cover_medium}`;
          glideImg.alt = `album cover of ${album.title}`;

          glideImg.addEventListener("click", function () {
            window.location.href = `./album.html?albumID=${albumData.id}`;
          });
          console.log(`Album cover + event di indice ${index} di ${carouselElement} fatta`);

          const albumTitle = document.createElement("h6");
          albumTitle.innerText = `${album.title}`;
          albumTitle.className = "mt-2";

          const albumInfo = document.createElement("p");
          const albumYear = document.createElement("span");
          albumInfo.innerText = `${artist.name}`;
          albumInfo.className = "roles";

          albumInfo.addEventListener("click", function () {
            window.location.href = `./artist_page.html?artistID=${artist.name}`;
          });

          albumYear.className = "Autore";
          console.log(`Titolo + autore di ${index} di ${carouselElement} fatta`);

          albumInfo.appendChild(albumYear);
          glideLi.appendChild(glideImg);
          glideLi.appendChild(albumTitle);
          glideLi.appendChild(albumInfo);
          console.log(`Inseriti elementi Album di ${index} di ${carouselElement}`);

          glideUl.appendChild(glideLi);
          console.log(`Inserita Lista ${index} di ${carouselElement}`);
        });

        glideTrack.appendChild(glideUl);
        console.log(`Ciclo finito, creata UL di ${carouselElement}`);

        glide.appendChild(glideTrack);
        carouselElement.appendChild(glide);
        console.log(`Inserito tutto nel carousel ${carouselElement}`);

        const arrowCont = document.createElement("div");
        arrowCont.className = "glide__arrows";
        arrowCont.setAttribute("id", "bothArrows");
        arrowCont.setAttribute("data-glide-el", "controls");

        const leftArrow = document.createElement("button");
        leftArrow.setAttribute("id", "leftArrowIndex");
        leftArrow.className = "glide__arrow glide__arrow--left";
        leftArrow.setAttribute("data-glide-dir", "<");
        leftArrow.innerText = "<";

        const rightArrow = document.createElement("button");
        rightArrow.setAttribute("id", "rightArrowIndex");
        rightArrow.className = "glide__arrow glide__arrow--right";
        rightArrow.setAttribute("data-glide-dir", ">");
        rightArrow.innerText = ">";

        arrowCont.appendChild(leftArrow);
        arrowCont.appendChild(rightArrow);
        glide.appendChild(arrowCont);

        const row = document.createElement("div");
        row.className = "row mt-5 justify-content-start";

        const div2 = document.createElement("div");
        div2.className = "d-none d-xl-block col-5";

        const div7 = document.createElement("div");
        div7.className = "col-12 col-xl-7";

        row.appendChild(div2);
        row.appendChild(div7);
        carouselElement.appendChild(row);

        new Glide(glide, {
          type: "carousel",
          perView: 6,
          breakpoints: {
            1500: { perView: 4 },
            1050: { perView: 3 },
            970: { perView: 2 },
            480: { perView: 1 },
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
  // rowPlaylist.innerHTML = "";

  searchAndShowLittleAlbum();
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
