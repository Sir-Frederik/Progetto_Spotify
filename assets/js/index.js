// Seleziona il bottone e l'aside
const toggleLibreriaBtn = document.getElementById("toggleLibreriaBtn");
const libreriaAside = document.querySelector("aside");

// Aggiungi un listener per il click del bottone
toggleLibreriaBtn.addEventListener("click", () => {
  // Aggiungi o rimuovi la classe "d-none" (Bootstrap class per nascondere)
  libreriaAside.classList.toggle("d-none");
});
