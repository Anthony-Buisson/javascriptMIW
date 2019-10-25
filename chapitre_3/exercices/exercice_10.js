let rand =Math.floor( Math.random()*101);
console.log(rand);
let nbessais = 1;
while (nbessais < 11){
    let number = parseInt(prompt('Votre choix'));
    if(number < rand) alert('Trop petit');
    else if(number > rand) alert('Trop grand');
    else alert('Gagné en '+nbessais+' coups');
    nbessais++;
}
