function surfCarre() {
    let c = prompt("Saisie la longueur d'un coté du carré");
    parseFloat(c);
    alert(c*c);
}
function surfRect() {
    let c = prompt("Saisie la longueur du rectangle");
    let l = prompt("Saisie la largeur du rectangle");
    parseFloat(c);
    parseFloat(l);
    alert(c*l);
}
function surfCercle() {
    let r = prompt("Saisie le rayon du cercle");
    parseFloat(r);
    alert(r*r*Math.PI);
}

