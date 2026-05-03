// Kuvakarusellin sisältö JSON-taulukossa
let cats_array = [
  {"name": "Pilli",  "src": "images/pilli.jpg"},
  {"name": "Misu",   "src": "images/misu.jpg"},
  {"name": "Haukku", "src": "images/haukku.jpg"}
];

let current = 0;
let toiminnonTunniste = null;

// Luetaan indeksi localStoragesta, jos se on tallennettu aiemmin
if (localStorage.hasOwnProperty('karuselliIndeksi')) {
  current = parseInt(localStorage.getItem('karuselliIndeksi'));
}

// Näytetään kuva indeksin mukaan
function naytaKuva(index) {
  current = (index + cats_array.length) % cats_array.length;

  // Tallennetaan indeksi localStorageen
  localStorage.setItem('karuselliIndeksi', current);

  $('#slide-img').attr('src', cats_array[current].src).attr('alt', cats_array[current].name);
  $('#slide-caption').text(cats_array[current].name);
}

// Siirrytään seuraavaan kuvaan
function seuraavaKuva() {
  naytaKuva(current + 1);
}

// Siirrytään edelliseen kuvaan
function edellinenKuva() {
  naytaKuva(current - 1);
}

// Toistettava funktio automaattiseen etenemiseen
function automaattinenEtenemine() {
  naytaKuva(current + 1);
}

// Käynnistää tai pysäyttää automaattisen esityksen
function kaynnistaTaiPysayta() {
  if (toiminnonTunniste !== null) {
    // Pysäytetään esitys
    window.clearInterval(toiminnonTunniste);
    toiminnonTunniste = null;
    $('#btn-stop').html('<i class="bi bi-play-fill"></i>');
  } else {
    // Käynnistetään esitys
    toiminnonTunniste = window.setInterval(automaattinenEtenemine, 3000);
    $('#btn-stop').html('<i class="bi bi-pause-fill"></i>');
  }
}

// Sivun latautuessa näytetään tallennetusta indeksistä lähtien
naytaKuva(current);
