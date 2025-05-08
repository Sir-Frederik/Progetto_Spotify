const UrlPlaylist = "https://deezerdevs-deezer.p.rapidapi.com/playlist/";
const UrlAlbum = "https://deezerdevs-deezer.p.rapidapi.com/playlist/";

let query = "";

const arrayIdPlaylist = [98, 118, 125, 55, 123, 13, 86, 45];
const arrayIdAlbum = [];
const rowPlaylist = document.querySelector(".rowPlaylist ");
const carousel1 = document.querySelector(".carousel1 ");

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
        rowPlaylist.appendChild(col);
        //   });
      })

      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  });
};
const searchAndShowAlbum = () => {
  /*   for (let i = 0; i < 10; i++) {
    const number = Math.floor(Math.random() * 9000) + 1000;
    arrayIdAlbum.push(number);
  // }
  arrayIdAlbum.forEach((id) => {
    query = id;
    console.log(query);
    console.log(UrlAlbum + query);
 */
  fetch("../json/albums.json", {
    method: "GET",
  })
    .then((resp) => {
      console.log("ciaoooo" + resp);
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
      console.log("Ciao sono entrato nel then");
      let arrayLength = data.albums.length;
      console.log("lunghezza array" + arrayLength);

      // const card = document.createElement("div");
      // card.className = "carousel-card me-3 text-white";
      // card.innerHTML = `<img src="${album.cover_medium}" class="img-fluid rounded mb-2"  />
      //             <p class="fw-semibold mb-1">${album.title}</p>
      //             <p class="text-muted small mb-0">${album.artist?.name || "Artista sconosciuto"}</p>
      //                                               `;
      // carousel1.appendChild(card);
    })

    .catch((error) => {
      console.log(error);
      alert(error.message);
    });
};

window.onload = function () {
  rowPlaylist.innerHTML = "";
  carousel1.innerHTML = "";
  searchAndShowPlaylist();
  searchAndShowAlbum();
};

const toggleLibreriaBtn = document.getElementById("toggleLibreriaBtn");
const libreriaAside = document.querySelector("aside");

toggleLibreriaBtn.addEventListener("click", () => {
  libreriaAside.classList.toggle("d-none");
});
