const URL = `https://deezerdevs-deezer.p.rapidapi.com/search?q=`;

const form = document.getElementById("searchbarQuery");
const row = document.getElementById("searchGrid");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const query = document.getElementById("userQuery").value;

  fetch(URL + query, {
    headers: {
      "Content-Type": "application/json",
      "x-rapidapi-key": token,
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then(resp => {
      if (!resp.ok) {
        if (resp.status === 400) {
          throw new Error("Risorsa non trovata.");
        } else if (resp.status === 500) {
          throw new Error("Errore lato server.");
        }
        throw new Error("Errore nella fetch.");
      }
      console.log(resp);
      return resp.json();
    })
    .then(Object => {
      const arrOfSongs = Object.data;
      console.log(arrOfSongs);
    });
});
