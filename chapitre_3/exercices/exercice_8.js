let T = [
        '0001*Pomme*1.5',
        '0002*Poire*1.2',
        '0003*Abricot*1.6',
        '0004*Banane*1.7',
        '0005*Peche*1.1',
        '0006*Mangue*1.3',
        '0007*Orange*0.5',
        '0008*Ananas*11.5',
        '0009*Mandarine*5.5',
        '0010*Kiwi*7.5',
        '0011*Pamplemousse*3.5'
    ];

let select = '<select name="products" onchange="afficherFormulaire(this.value)"><option value="">---</option>';
let inputs = '<label>Ref</label><input id="ref" type="text" readonly>' +
    '<label>Designation</label><input id="designation" type="text" readonly>' +
    '<label>Prix</label><input id="prix" value="1" type="number" step="0.01" readonly>' +
    '<label>Quantité</label><input onchange="majMontant(this.value)" id="quantite" type="number">' +
    '<label>Montant</label><input id="montant" type="number" readonly>';

T.forEach(function (el) {
    select+= '<option value="'+T.indexOf(el)+'">'+el.split('*')[1]+'</option>';
});
select+= '</select>';
document.getElementById('exercice').innerHTML = select + '<br>'+ inputs;

function afficherFormulaire(index) {
    if(index){
        let infos = T[index].split('*');
        document.getElementById('ref').value = infos[0];
        document.getElementById('designation').value = infos[1];
        document.getElementById('prix').value = infos[2];
    }
}
function majMontant(value) {
    document.getElementById('montant').value = (value*document.getElementById('prix').value).toFixed(2);
}