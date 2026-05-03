let count = 0;
const fetchHistory = [];

function getRandomNumber() {
  return Math.floor(Math.random() * 200) + 1;
}

function renderJqAccordion() {
  const $acc = $('#jq-accordion');
  $acc.html('');

  fetchHistory.forEach((item, i) => {
    $acc.append(`<h3>${i + 1}. haku</h3><div><p>${item.text}</p></div>`);
  });

  if ($acc.data('ui-accordion')) {
    $acc.accordion('destroy');
  }

  if (fetchHistory.length > 0) {
    $acc.accordion({
      collapsible: true,
      active: fetchHistory.length - 1,
      heightStyle: 'content'
    });
  }
}

function renderBsAccordion() {
  const $acc = $('#bs-accordion');
  $acc.html('');

  fetchHistory.forEach((item, i) => {
    const idx = i + 1;
    const isLast = (i === fetchHistory.length - 1);

    $acc.append(`
      <div class="accordion-item">
        <h2 class="accordion-header" id="bs-heading-${idx}">
          <button class="accordion-button ${isLast ? '' : 'collapsed'}"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#bs-collapse-${idx}">
            ${idx}. haku
          </button>
        </h2>
        <div id="bs-collapse-${idx}" class="accordion-collapse collapse ${isLast ? 'show' : ''}">
          <div class="accordion-body">${item.text}</div>
        </div>
      </div>
    `);
  });
}

$('#btn-hae').on('click', function () {
  $('#loader').show();
  $('#btn-hae').prop('disabled', true);

  fetch("https://api.chucknorris.io/jokes/random")
    .then(res => res.json())
    .then(data => {
      count++;
      $('#counter').text(count);

      const text = data.value;

      $('#results').append(`<p>${text}</p>`);
      fetchHistory.push({ text });

      renderJqAccordion();
      renderBsAccordion();
    })
    .catch(() => {
      $('#results').append('<p class="text-danger">Virhe tiedon haussa.</p>');
    })
    .finally(() => {
      $('#loader').hide();
      $('#btn-hae').prop('disabled', false);
    });
});