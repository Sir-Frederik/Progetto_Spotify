const UrlPlaylist = "https://deezerdevs-deezer.p.rapidapi.com/playlist/125";
let query = "";
const arrayIdPlaylist = [125, 118, 27, 55, 123, 13, 77, 86];
const rowPlaylist = document.querySelector(".rowPlaylist ");

const searchPlaylist = () => {
  arrayIdPlaylist.forEach((id) => {
    query = id;
    fetch(`${UrlPlaylist} ${query}`, {
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
            throw new Error("Errore nella fetch");
          }
        }
        return resp.json();
      })
      .then((playlist) => {
        //   playlist.forEach((onePlaylist) => {
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

window.onload = function () {
  rowPlaylist.innerHTML = "";
  searchPlaylist();
};
