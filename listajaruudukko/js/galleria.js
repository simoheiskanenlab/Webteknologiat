// Kissakuvat JSON-taulukossa
const kuvat = [
  {"name": "Pilli",  "src": "images/pilli.jpg"},
  {"name": "Misu",   "src": "images/misu.jpg"},
  {"name": "Haukku", "src": "images/haukku.jpg"}
];

// Rakennetaan kortit taulukosta
function buildCards() {
  const $container = $('#media-container');
  $container.empty();

  kuvat.forEach(function(kuva, i) {
    const card = `
      <div class="media-card" style="animation-delay:${i * 0.06}s">
        <img class="card-image" src="${kuva.src}" alt="${kuva.name}" loading="lazy">
        <div class="card-body">
          <div class="card-name">${kuva.name}</div>
        </div>
      </div>`;
    $container.append(card);
  });

  $('#item-count').text(kuvat.length + ' kuvaa');
}

// Ruudukko-nappi
$('#btn-grid').on('click', function() {
  if ($('#media-container').hasClass('grid-view')) return;
  $('#media-container').removeClass('list-view').addClass('grid-view');
  $(this).addClass('active');
  $('#btn-list').removeClass('active');
  buildCards();
});

// Lista-nappi
$('#btn-list').on('click', function() {
  if ($('#media-container').hasClass('list-view')) return;
  $('#media-container').removeClass('grid-view').addClass('list-view');
  $(this).addClass('active');
  $('#btn-grid').removeClass('active');
  buildCards();
});

// Oletuksena ruudukkonäkymä
$('#btn-grid').addClass('active');
buildCards();
