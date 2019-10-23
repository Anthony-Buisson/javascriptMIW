let R = ['001','002','003','004','005',];
let D = ['pomme','poire','fraise','framboise','tartiflette',];
let P = [1,1.2,0.8,1.5,7,];

let select = '<select name="products" onchange="afficherInfos(this.value)"><option value="">---</option>';
R.forEach(function (el) {
    select+= '<option value="'+R.indexOf(el)+'">'+el+'</option>';
});
select+= '</select>';
document.getElementById('exercice').innerHTML = select;

function afficherInfos(index) {
    if(index) alert('Désignation : '+D[index]+'\nPrix : '+P[index]);
}