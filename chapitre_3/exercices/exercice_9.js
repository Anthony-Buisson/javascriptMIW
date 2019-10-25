let R = ['Portes','Fenêtre','Volets'];
let M = ['Bois','Pvc','Aluminium'];

let selectL1 = '<select id="produit"><option value="">---</option>';
R.forEach(function (el) {
    selectL1+= '<option value="'+el+'">'+el+'</option>';
});
selectL1+= '</select>';

let selectL2 = '<select id="matiere"><option value="">---</option>';
M.forEach(function (el) {
    selectL2+= '<option value="'+el+'">'+el+'</option>';
});
selectL2+= '</select>';

let pageBtn = '<button type="button" onclick="openPage()">Ouvrir la page</button>';

document.getElementById('exercice').innerHTML += selectL1+selectL2+pageBtn;

function openPage() {
    let produit = document.getElementById('produit').value;
    let matiere = document.getElementById('matiere').value;
    window.open(produit.charAt(0)+'_'+matiere+'.html');
}