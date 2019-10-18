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
    let reg = /^[a-z]{2,20}$/i;
    if(!reg.test(n)) throw new Error();
    n = n.charAt(0).toUpperCase()+n.toLowerCase().slice(1);
    let Pnouveau = new Tpersonne(n);
    if(Pdebut) Pnouveau.pSuivant = Pdebut;
    Pdebut = Pnouveau;
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
function supprimerListe(n = Pdebut) {
    if(n.pSuivant !== null){
        let tmp = n.pSuivant;
        delete n.pSuivant;
        supprimerListe(tmp);
    }
    if(n === Pdebut) Pdebut = null;
}
function init() {
    supprimerListe();
}
function afficherListe() {//liste() renvoie une chaine de caractères correspondant à tous les noms
    document.getElementById('lc-output').innerHTML = liste();
}
