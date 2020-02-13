import {GraphiquesMorpion} from './GraphiquesMorpion.js';

let random = (min, max)=> Math.floor(Math.random() * (max+1 - min) + min);

class Morpion {

    constructor(){
        this.canva = new GraphiquesMorpion();
        this.canva.dessinerGrille();
        this.canva.afficherPanneauControles();

        if(!this.recupererAnciennePartie()) this.creerNouvelleSauvegarde();
        this.creerEvenements();
        this.canva.afficherTour(this.resultats, this.tourRond);
    };

    creerEvenements = ()=>{
        this.bot   = this.canva.boutonBot.checked;
        this.debug = this.canva.boutonDebug.checked;
        this.croix = this.canva.inputCroix.value;
        this.ronds = this.canva.inputRonds.value;

        this.canva.canvas.onclick                    = this.jouerCoup;
        this.canva.boutonReinitialiserPartie.onclick = this.reinitialiserPartie;
        this.canva.boutonReinitialiserGrille.onclick = this.reinitialiserGrille;

        this.canva.boutonDebug.onchange = el => this.debug = el.target.checked;
        this.canva.boutonBot.onchange   = el => this.bot   = el.target.checked;
        this.canva.inputCroix.onchange  = el => this.croix = el.target.value;
        this.canva.inputRonds.onchange  = el => this.ronds = el.target.value;
    };

    initialiserValeurs = ()=>{
        this.grille = [
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
        ];
        [this.tourRond, this.gagnant, this.nbCoups] = [false, false, 0];
    };

    reinitialiserPartie = ()=>{
        localStorage.clear();
        this.creerNouvelleSauvegarde();
        this.canva.dessinerGrille();
        this.canva.afficherTour(this.resultats, this.tourRond);
    };

    reinitialiserGrille = ()=>{
        this.initialiserValeurs();
        this.mettreAJourPartie();
        this.canva.dessinerGrille();
        this.canva.afficherTour(this.resultats, this.tourRond);
    };

    recupererAnciennePartie = ()=>{
        let historiquePartie = JSON.parse(localStorage.getItem('morpion'));
        if(!historiquePartie) return false;
        this.resultats              = historiquePartie.resultats;
        this.parties                = historiquePartie.parties;
        this.grille                 = this.parties[this.parties.length-1].grille;
        this.tourRond               = this.parties[this.parties.length-1].tourRond;
        this.nbCoups                = this.parties[this.parties.length-1].nbCoups;
        this.gagnant                = this.parties[this.parties.length-1].gagnant;
        this.canva.inputCroix.value = this.parties[this.parties.length-1].croix;
        this.canva.inputRonds.value = this.parties[this.parties.length-1].ronds;
        for (let i = 0; i < this.grille.length; i++) {
            for (let j = 0; j < this.grille.length; j++) {
                if(this.grille[i][j] !== 0) this.canva.afficherJeton(j,i, this.grille[i][j] < 0);
            }
        }
        return true;
    };

    /**
     * Met à jour le localStorage
     * (utilisée à chaque coup valide)
     */
    mettreAJourPartie = ()=>{
        this.parties[this.parties.length-1] = {
            grille:   this.grille,
            tourRond: this.tourRond,
            nbCoups:  this.nbCoups,
            croix:    this.croix,
            ronds:    this.ronds,
            gagnant:  this.gagnant,
        };
        localStorage.setItem('morpion', JSON.stringify({
            resultats: this.resultats,
            parties:   this.parties
        }));
    };

    /**
     * Crée une partie et la sauvegarde en localStorage
     * (utilisée lorsqu'il n'y a pas de parties en localstorage)
     */
    creerNouvelleSauvegarde = ()=>{
        this.resultats = [0,0,0];
        this.initialiserValeurs();
        this.parties = [{
            grille:   this.grille,
            tourRond: this.tourRond,
            nbCoups:  this.nbCoups,
            croix:    this.croix,
            ronds:    this.ronds,
            gagnant:  false
        }];
        this.mettreAJourPartie();
    };

    /**
     * Méthode appellée à chaque coup joué
     * (par le joueur ou un bot)
     * @param evt
     */
    jouerCoup = (evt)=>{
        let coordX = evt ? Math.trunc(evt.layerX / this.canva.cellSize) : random(0, this.grille.length-1);
        let coordY = evt ? Math.trunc(evt.layerY / this.canva.cellSize) : random(0, this.grille.length-1);

        /*Le coup est valide*/
        if(this.grille[coordY][coordX] === 0) {
            this.canva.afficherJeton(coordX, coordY, this.tourRond);
            this.canva.afficherTour(this.resultats, !this.tourRond);

            this.grille[coordY][coordX] = this.tourRond ? -1 : 1;
            this.tourRond               = !this.tourRond;
            this.mettreAJourPartie();
            if (this.verifierFin()){
                if(this.tourRond) {
                    this.resultats[0]++;
                    this.finPartie(`${this.croix} gagne !`);
                }else{
                    this.resultats[1]++;
                    this.finPartie(`${this.ronds} gagne !`);
                }
                return;
            }
            else if(this.nbCoups === 24) {
                this.resultats[2]++;
                this.finPartie('Égalité !');
                return;
            }
            this.nbCoups++;
            if((this.bot && this.tourRond && this.nbCoups < this.grille.length*this.grille.length) || (this.debug) )this.jouerCoup();
        }
        /*Le coup n'est pas valide : le bot rejoue et le joueur doit recliquer*/
        else if(!evt)
            this.jouerCoup();
    };

    /**
     *
     * @returns {boolean} si le coup est gagnant ou non
     */
    verifierFin = ()=>{
        let len = this.grille.length-1;
        for (let i = 0; i <= len; i++) {
            for (let j = 0; j < 2; j++) {
                /*Verification des lignes et colonnes*/
                if ((Math.abs(this.grille[i][j] + this.grille[i][1 + j] + this.grille[i][2 + j] + this.grille[i][3 + j]) === 4) ||
                    (Math.abs(this.grille[j][i] + this.grille[1 + j][i] + this.grille[2 + j][i] + this.grille[3 + j][i]) === 4))
                    return true;
                /*Verification des diagonales*/
                if (i < 2) {
                    let diagHGBD = this.grille[i][j] + this.grille[i + 1][j + 1] + this.grille[i + 2][j + 2] + this.grille[i + 3][j + 3];
                    let diagBDHG = this.grille[j][i] + this.grille[j + 1][i + 1] + this.grille[j + 2][i + 2] + this.grille[j + 3][i + 3];
                    let diagHDBG = this.grille[i][len - j] + this.grille[i + 1][len - j - 1] + this.grille[i + 2][len - j - 2] + this.grille[i + 3][len - j - 3];
                    let diagBGHD = this.grille[len - j][len - i] + this.grille[len - j - 1][len - i - 1] + this.grille[len - j - 2][len - i - 2] + this.grille[len - j - 3][len - i - 3];
                    if ((Math.abs(diagHGBD) === 4) || (Math.abs(diagBDHG) === 4) || (Math.abs(diagHDBG) === 4) || (Math.abs(diagBGHD) === 4))
                        return true;
                }
            }
        }
    };

    finPartie = (message = null)=>{
        if(message) {
            this.gagnant = true;
            this.canva.afficherEcranFin(message);
            this.initialiserValeurs();
            this.parties.push( {
                grille:   this.grille,
                tourRond: this.tourRond,
                nbCoups:  this.nbCoups,
                croix:    this.croix,
                ronds:    this.ronds,
                gagnant:  false
            });
            this.mettreAJourPartie();
            this.canva.afficherTour(this.resultats, this.tourRond);
            this.canva.canvas.onclick = ()=>this.finPartie();
        }else{
            this.canva.dessinerGrille();
            this.canva.canvas.onclick = this.jouerCoup;
        }
    };
}
let mp = new Morpion();