var Pdebut = null;

function Tpersonne(nom) {
    this.nom = nom;
    this.pSuivant = null;
}
function liste() {
    let noms = '';
    let personne = Pdebut;
    while(personne){
        noms += personne.nom + ', ';
        personne = personne.pSuivant;
    }
    return noms;
}
function ajout(n) {
    let reg = /^[a-z]{2,20}$/i;//regex pour tester la longueur et le type des caractères saisis
    if(!reg.test(n) || !n){
        alert('Format invalide : 2<longueur<20');
        return;
    }
    n = n.charAt(0).toUpperCase() + n.toLowerCase().slice(1);//nom avec la premiere lettre en majuscule et le reste en minuscules
    let Pnouveau = new Tpersonne(n);
    if (Pdebut) Pnouveau.pSuivant = Pdebut;//test si la chaine a déjà au moins un élément
    Pdebut = Pnouveau;
    afficherListe();
}
function suppression(n) {
    let s = Pdebut;
    let p = null;
    while (s!==null && n!==s.nom){
        p = s;
        s = s.pSuivant;
    }
    if(!s) return;
    if(s.nom === n){
        if(s === Pdebut) Pdebut = s.pSuivant;
        else{
            p.pSuivant = s.pSuivant;
        }
        delete s.nom;
        delete s.pSuivant;
    }
}
function supprimerListeRecursif(n = Pdebut) {
    if(!Pdebut) return;
    if(n.pSuivant !== null){
        let tmp = n.pSuivant;
        delete n.pSuivant;
        delete n.nom;
        supprimerListe(tmp);
    }
    if(n === Pdebut) Pdebut = null;
}
function supprimerListe() {
    let s = Pdebut;
    let tmp;
    while (s){
        tmp = s.pSuivant; //on garde le suivant
        delete s.nom;   //on supprime le courant
        delete s.pSuivant;
        s = tmp;
    }
    Pdebut = null;
}
function init() {
    //fonction pour utiliser la suppression récursive
    // supprimerListeRecursif();
    supprimerListe();
}
function afficherListe() {//liste() renvoie une chaine de caractères correspondant à tous les noms
    document.getElementById('lc-output').innerHTML = liste();
}
