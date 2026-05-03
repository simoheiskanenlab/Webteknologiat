// helloworld.js

window.onload = function() {
    console.log("Tämä kirjoitetaan selaimen konsoliin");

    let address = 'Yliopistonkatu 36';
    let city = 'Lappeenranta';
    updateMap(address, city);
};

function sayHelloTo(name) {
    alert("Hei " + name + "!");
    console.log("sayHello-funktio suoritettu");
}

function searchMap() {
    let address = document.getElementById('addr-field').value;
    let city = document.getElementById('city-field').value;
    updateMap(address, city);
    console.log("Haetaan: " + address + ", " + city);
}

function updateMap(address, city) {
    let query = encodeURIComponent(address + ' ' + city);

    // Haetaan koordinaatit Nominatim-palvelusta (OpenStreetMap)
    fetch('https://nominatim.openstreetmap.org/search?q=' + query + '&format=json&limit=1')
        .then(function(response) { return response.json(); })
        .then(function(data) {
            if (data.length === 0) {
                alert("Osoitetta ei löydy: " + address + ", " + city);
                return;
            }
            let lat = parseFloat(data[0].lat);
            let lon = parseFloat(data[0].lon);
            let delta = 0.005;

            // Muodostetaan OpenStreetMap embed -url
            let place = 'https://www.openstreetmap.org/export/embed.html'
                + '?bbox=' + (lon - delta) + ',' + (lat - delta) + ',' + (lon + delta) + ',' + (lat + delta)
                + '&layer=mapnik'
                + '&marker=' + lat + ',' + lon;

            let iframeElement = document.getElementById('map-frame');
            iframeElement.src = place;
        });
}