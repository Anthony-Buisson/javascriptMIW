function surfCarre(c) {
    return c*c;
}
function surfRect(c,l) {
    return c*l;
}
function surfCercle(r) {
    return r*r*Math.PI;
}
let r = prompt('Type de surface à calculer :\n1 : Carré\n2 : Rectangle\n3 : Cercle');
switch (r) {
    case "1":
        alert('Surface : '+surfCarre(parseFloat(prompt('Longueur des côtés : '))));
        break;
    case "2":
        alert('Surface : '+surfRect(parseFloat(prompt('Largeur : ')),parseFloat(prompt('Longueur des côtés : '))));
        break;
    case "3":
        alert('Surface : '+surfCercle(parseFloat(prompt('Rayon : '))).toFixed(2));
        break;
}