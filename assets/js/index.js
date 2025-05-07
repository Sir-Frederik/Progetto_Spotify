const URL = "https://deezerdevs-deezer.p.rapidapi.com/search?q=queen";
let query = "queen";

const searchAuthor = () => {
  fetch(`${URL} ${query}`, {
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
    .then((author) => {
      console.log(author);
    })
    .catch((error) => {
      console.log(error);
      alert(error.message);
    });
};

window.onload = function () {
  searchAuthor();
};
