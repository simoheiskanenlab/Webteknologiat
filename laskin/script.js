// Apufunktio: satunnainen kokonaisluku väliltä [min, max]
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Apufunktio: virheilmoitus jQuery UI -dialogissa
function showError(msg) {
  $('#errorMsg').text(msg);
  $('#errorDialog').dialog({
    modal: true,
    width: 300,
    buttons: {
      'OK': function () { $(this).dialog('close'); }
    }
  });
}

// Apufunktio: operaattorin näyttömerkki
function opSymbol(op) {
  return { '+': '+', '-': '−', '*': '×', '/': '÷' }[op] || op;
}

// Tila
let laskujaYhteensa = 0;

// Alustetaan satunnaisluvut sivun latautuessa (1–10)
$('#numA').val(randInt(1, 10));
$('#numB').val(randInt(1, 10));

// Askelnapit: Luku A
$('#decA').on('click', function () {
  $('#numA').val((parseInt($('#numA').val()) || 0) - 1);
});
$('#incA').on('click', function () {
  $('#numA').val((parseInt($('#numA').val()) || 0) + 1);
});

// Askelnapit: Luku B
$('#decB').on('click', function () {
  $('#numB').val((parseInt($('#numB').val()) || 0) - 1);
});
$('#incB').on('click', function () {
  $('#numB').val((parseInt($('#numB').val()) || 0) + 1);
});

// Laske-painike
$('#btnLaske').on('click', function () {
  const rawA = $('#numA').val().trim();
  const rawB = $('#numB').val().trim();

  // Validointi: tyhjät kentät
  if (rawA === '' || rawB === '') {
    showError('Molemmat numerokentät ovat pakollisia.');
    return;
  }

  const a = parseInt(rawA, 10);
  const b = parseInt(rawB, 10);

  // Validointi: ei-numeeriset arvot
  if (isNaN(a) || isNaN(b)) {
    showError('Syötä kelvolliset kokonaisluvut molempiin kenttiin.');
    return;
  }

  // Luetaan operaattori pudotusvalikosta
  const op = $('#operator').val();
  let result;

  switch (op) {
    case '+': result = a + b; break;
    case '-': result = a - b; break;
    case '*': result = a * b; break;
    case '/':
      if (b === 0) {
        showError('Nollalla jakaminen ei ole sallittua.');
        return;
      }
      result = Math.round((a / b) * 10000) / 10000;
      break;
  }

  // Näytetään tulos
  $('#tulos').text(result).show();

  // Lisätään historiaan
  laskujaYhteensa++;
  const rivi = `${a} ${opSymbol(op)} ${b} = ${result}`;

  // Päivitetään historiaotsikko ja lisätään rivi
  let historia = $('#historia');
  historia.find('.lkm').text('laskutoimituksia: ' + laskujaYhteensa + ' kpl');
  if (historia.find('.lkm').length === 0) {
    historia.prepend('<p class="lkm">laskutoimituksia: ' + laskujaYhteensa + ' kpl</p>');
  }
  historia.append('<p>' + rivi + '</p>');
});
