const URL = `https://deezerdevs-deezer.p.rapidapi.com/search?limit=8&q=`;

const form = document.getElementById("searchbarQuery");
const grid = document.getElementById("searchGrid");
const section = document.getElementById("section");
const carousel = document.querySelector(".glide");

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

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
      return resp.json();
    })
    .then(Object => {
      const arrOfSongs = Object.data;
      console.log(arrOfSongs);

      section.innerHTML = "";

      grid.className = "d-none";
      const container = document.createElement("div");
      container.className = "container mt-3";

      const div1 = document.createElement("div");

      const btnTutto = document.createElement("button");
      btnTutto.className = "searchPageBtn rounded-pill ms-2 ";
      btnTutto.type = "button";
      btnTutto.innerText = "Tutto";

      const btnArtisti = document.createElement("button");
      btnArtisti.className = "searchPageBtn rounded-pill ms-2 d-none d-md-inline";
      btnArtisti.type = "button";
      btnArtisti.innerText = "Artisti";

      const btnBrani = document.createElement("button");
      btnBrani.className = "searchPageBtn rounded-pill ms-2 ";
      btnBrani.type = "button";
      btnBrani.innerText = "Brani";

      const btnAlbum = document.createElement("button");
      btnAlbum.className = "searchPageBtn rounded-pill ms-2 d-none d-md-inline";
      btnAlbum.type = "button";
      btnAlbum.innerText = "Album";

      div1.appendChild(btnTutto);
      div1.appendChild(btnArtisti);
      div1.appendChild(btnBrani);
      div1.appendChild(btnAlbum);

      const row = document.createElement("div");
      row.className = "row mt-5 justify-content-start";

      const div2 = document.createElement("div");
      div2.className = "d-none d-xl-block col-5";

      const h4 = document.createElement("h4");
      h4.className = "fw-bold";
      h4.innerText = "Risultato più rilevante";

      const div3 = document.createElement("div");
      div3.className = "container py-3 rounded-3";
      div3.setAttribute("id", "risultatoRilevante");
      div3.className = "container py-3 rounded-3";

      const div4 = document.createElement("div");
      div4.setAttribute("id", "rilevantImg");
      div4.className = "mb-3";
      const img = document.createElement("img");
      img.src = `${arrOfSongs[0].album.cover}`;
      img.alt = "photo";
      img.className = "img-fluid rounded-3";
      div4.appendChild(img);

      const div5 = document.createElement("div");
      const h2 = document.createElement("h2");
      h2.className = "mb-1 fw-bold fs-5 text-truncate";
      h2.innerText = `${arrOfSongs[0].title}`;
      div5.appendChild(h2);

      const div6 = document.createElement("div");
      const nameArtist = document.createElement("p");
      const span1 = document.createElement("span");
      span1.innerText = "Brano ";
      span1.className = "roles brano";
      const span2 = document.createElement("span");
      span2.innerText = ` ${arrOfSongs[0].artist.name}`;
      span2.className = "fw-bold roles";
      nameArtist.appendChild(span1);
      nameArtist.appendChild(span2);
      div6.appendChild(nameArtist);

      div3.appendChild(div4);
      div3.appendChild(div5);
      div3.appendChild(div6);

      div2.appendChild(h4);
      div2.appendChild(div3);

      const div7 = document.createElement("div");
      div7.className = "col-12 col-md-7";

      const secondh4 = document.createElement("h4");
      secondh4.className = "fw-bold";
      secondh4.innerText = "Brani";
      div7.appendChild(secondh4);

      const glide = document.createElement("div");
      glide.className = "glide";

      const album = document.createElement("h4");
      album.innerText = "Album";

      const glideTrack = document.createElement("div");
      glideTrack.className = "glide__track";
      glideTrack.dataGlideEl = "track";

      const glideUl = document.createElement("ul");
      glideUl.className = "glide__slides";

      //   FOR EACH PER I BRANI
      arrOfSongs.forEach(song => {
        const div8 = document.createElement("div");
        div8.className = "d-flex justify-content-between align-items-center my-2 pt-2 braniCercati";
        // div8.setAttribute("id", "braniCercati");

        const div9 = document.createElement("div");
        div9.className = "d-flex justify-content-start align-items-center gap-2 braniImg";
        // div9.setAttribute("id", "braniImg");

        const secondImg = document.createElement("img");
        secondImg.src = `${song.album.cover}`;
        secondImg.alt = `${song.title}`;
        secondImg.className = "img-fluid rounded-3";

        const div10 = document.createElement("div");
        const h5 = document.createElement("h5");
        h5.innerText = `${song.title}`;
        h5.className = "fw-bold mb-0 roles";
        const paraArtist = document.createElement("p");
        paraArtist.innerText = `${song.artist.name}`;
        paraArtist.className = "roles mb-0";

        div10.appendChild(h5);
        div10.appendChild(paraArtist);

        div9.appendChild(secondImg);
        div9.appendChild(div10);

        const div11 = document.createElement("div");
        const paraMin = document.createElement("p");
        paraMin.innerText = formatTime(song.duration);
        paraMin.className = "roles mb-0";
        div11.appendChild(paraMin);

        div8.appendChild(div9);
        div8.appendChild(div11);
        div7.appendChild(div8);

        const glideLi = document.createElement("li");
        glideLi.className = "glide__slide";
        const glideImg = document.createElement("img");
        glideImg.className = "rounded-3";
        glideImg.src = `${song.album.cover}`;
        glideImg.alt = "photo";

        const albumTitle = document.createElement("h6");
        albumTitle.innerText = `${song.album.title}`;
        albumTitle.className = "mt-2";
        const albumInfo = document.createElement("p");
        const albumYear = document.createElement("span");
        albumInfo.innerText = `${song.artist.name}`;
        albumInfo.className = "roles";
        albumYear.innerText = "Album";
        albumYear.className = "brano";

        albumInfo.appendChild(albumYear);
        glideLi.appendChild(glideImg);
        glideLi.appendChild(albumTitle);
        glideLi.appendChild(albumInfo);

        glideUl.appendChild(glideLi);
      });

      glideTrack.appendChild(glideUl);
      glide.appendChild(album);
      glide.appendChild(glideTrack);

      // FRECCE DEL CAROSELLO

      const arrowCont = document.createElement("div");
      arrowCont.className = "glide__arrows";
      arrowCont.setAttribute("id", "bothArrows");
      arrowCont.setAttribute("data-glide-dir", "controls");

      const leftArrow = document.createElement("button");
      leftArrow.setAttribute("id", "leftArrow");
      leftArrow.className = "glide__arrow glide__arrow--left";
      leftArrow.setAttribute("data-glide-dir", "<");
      leftArrow.innerText = "<";

      const rightArrow = document.createElement("button");
      rightArrow.setAttribute("id", "rightArrow");
      rightArrow.className = "glide__arrow glide__arrow--right";
      rightArrow.setAttribute("data-glide-dir", ">");
      rightArrow.innerText = ">";

      arrowCont.appendChild(leftArrow);
      arrowCont.appendChild(rightArrow);

      glide.appendChild(arrowCont);

      row.appendChild(div2);
      row.appendChild(div7);

      container.appendChild(div1);
      container.appendChild(row);
      container.appendChild(glide);

      section.appendChild(container);

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

      form.reset();
    })
    .catch(err => console.log(err));
});
