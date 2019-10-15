//correspond a biblio.js
function nombre(n) {
    return n.match('^[+-]?((\\d+\\.?\\d*)|(\\d*\\.?\\d+))$') !== null;
}
function entierPositif(n) {
    return (parseInt(n)===parseFloat(n) && n>=0 && nombre(n));
}
function pair(x){
    return x%2===0 && entierPositif(x);
}
function arrondi(x,n){
    return x.toFixed(n);
}
function nbOccurences(c,ch){
    return ch.match(new RegExp(c,'g')).length;
}
function substitue(c1,c2,c){
    return c.replace(new RegExp(c1, 'g'),c2);
}
// alert('estUnNombre : '+nombre(prompt('Chaine à tester')));
// alert('estPositif : '+entierPositif(prompt('Nombre')));
// alert('estPair : '+pair(prompt('Nombre')));
alert('nombre arrondi : '+arrondi(parseFloat(prompt('Nombre')), prompt('Précision')));
// alert('nombre d\'occurences : '+nbOccurences(prompt('Chaine à trouver'), prompt('Chaine')));
// alert('nouvelle chaine : '+substitue(prompt('Chaine à remplacer'), prompt('Nouvelle chaine'), prompt('Chaine')));