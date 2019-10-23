//creation des options et du cadre de la carte
document.getElementById('exercice12')
    .innerHTML = '<select id="coordVille" onchange="updateMap(this.value)">' +
                    '<option value="46.52863469527167:2.43896484375">FRANCE</option>' +
                    '<option value="44.566667:6.083333">----Gap----</option>' +
                    '<option value="43.696036:7.265592">----Nice----</option>' +
                    '<option value="48.856614:2.352221">----Paris----</option>' +
                '</select>' +
                '<div id="mapid" style="height: 650px;"></div>';

//création de la carte (centrée sur la france entière)
let mymap = L.map('mapid').setView([46.52863469527167,2.43896484375], 6);
let popup = L.popup();
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>' }).addTo(mymap);
mymap.on('click', onMapClick);

//enlever la carte précédente et la remettre avec les nouvelles coordonnées
function updateMap(coord){
    mymap.remove();
    coord = coord.split(':');
    if(coord.join(':') === '46.52863469527167:2.43896484375'){
        mymap = L.map('mapid').setView([coord[0], coord[1]], 6);
    }
    else{
        mymap = L.map('mapid').setView([coord[0], coord[1]], 13);
        L.marker([coord[0], coord[1]]).addTo(mymap);
    }
    mymap.on('click', onMapClick);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>' }).addTo(mymap);
}

function onMapClick(e) {
    popup.setLatLng(e.latlng)
        .setContent(e.latlng.lat + ', ' + e.latlng.lng)
        .openOn(mymap);
}