const form = document.getElementById("searchbarQuery");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  window.location.href = `./searchPage.html?q=${document.getElementById("userQuery").value}`;
});
