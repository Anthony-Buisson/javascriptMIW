let villes = ["Marseille","Paris","Gap","Poitiers","Lyon","Grenoble","Bordeaux","Arles"];
let selectVille = _ce('select', document.body);

for (let i = 0; i < villes.length; i++) {
    let option = _cn('option', {value: villes[i]}, null,  selectVille);
    _ct(villes[i], option);
}

selectVille.onchange = recupInfo;

function afficheMeteo() {
    console.log(arguments);
}
function recupInfo() {
    let apikey = 'f8668c5a4eda974bc5db4a1ec14922a0';
    let url = 'http://api.openweathermap.org/data/2.5/weather';
    $get(url, {q: this.value+',fr', appid: apikey}, afficheMeteo(), null);
}