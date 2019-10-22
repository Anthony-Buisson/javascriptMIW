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
mymap = L.map('mapid').setView([46.52863469527167,2.43896484375], 6);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>' }).addTo(mymap);

//enlever la carte précédente et la remettre avec les nouvelles coordonnées
function updateMap(coord){
    coord = coord.split(':');
    mymap.remove();
    mymap = L.map('mapid').setView([coord[0], coord[1]], coord === '46.52863469527167:2.43896484375'? 6 : 13);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>' }).addTo(mymap);
}
