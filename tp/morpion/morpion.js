random = (min, max)=> Math.floor(Math.random() * (max+1 - min) + min);

class Morpion {

    constructor(){
        this.canvas = document.querySelector('#morpionZone');
        this.canvas.onclick = this.jouerCoup;
        this.ctx = this.canvas.getContext('2d');

        this.initialiserControles();
        this.dessinerGrille();
        if(!this.recupererAnciennePartie()) this.creerNouvelleSauvegarde();
        this.labelJ1.innerHTML = `Joueur 1 (${this.resultats[0]} victoires)${this.tourRond ? '' : '>>>>'}`;
        this.labelJ2.innerHTML = `Joueur 2 (${this.resultats[1]} victoires)${this.tourRond ? '>>>>' : ''}`;
    };

    initialiserValeurs = ()=>{
        this.grille = [
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
        ];
        this.tourRond = false;
        this.nbCoups = 0;
        this.gagnant = false;
    };

    reinitialiserPartie = ()=>{
        localStorage.clear();
        this.creerNouvelleSauvegarde();
        this.dessinerGrille();
        this.labelJ1.innerHTML = `Joueur 1 (${this.resultats[0]} victoires)${this.tourRond ? '' : '>>>>'}`;
        this.labelJ2.innerHTML = `Joueur 2 (${this.resultats[1]} victoires)${this.tourRond ? '>>>>' : ''}`;
    };

    reinitialiserGrille = ()=>{
        this.initialiserValeurs();
        this.mettreAJourPartie();
        this.dessinerGrille();
        this.labelJ1.innerHTML = `Joueur 1 (${this.resultats[0]} victoires)${this.tourRond ? '' : '>>>>'}`;
        this.labelJ2.innerHTML = `Joueur 2 (${this.resultats[1]} victoires)${this.tourRond ? '>>>>' : ''}`;
    };

    recupererAnciennePartie = ()=>{
        let historiquePartie = JSON.parse(localStorage.getItem('morpion'));
        if(!historiquePartie) return false;
        this.resultats = historiquePartie.resultats;
        this.grille = historiquePartie.parties[historiquePartie.parties.length-1].grille;
        this.tourRond = historiquePartie.parties[historiquePartie.parties.length-1].tourRond;
        this.nbCoups = historiquePartie.parties[historiquePartie.parties.length-1].nbCoups;
        this.parties = historiquePartie.parties;
        this.nbCoups = historiquePartie.parties[historiquePartie.parties.length-1].nbCoups;
        this.gagnant = historiquePartie.parties[historiquePartie.parties.length-1].gagnant;
        this.joueur1 = historiquePartie.parties[historiquePartie.parties.length-1].joueur1;
        this.joueur2 = historiquePartie.parties[historiquePartie.parties.length-1].joueur2;
        for (let i = 0; i < this.grille.length; i++) {
            for (let j = 0; j < this.grille.length; j++) {
                if(this.grille[i][j] !== 0) this.ajouterJeton(j* 102 + 51,i* 102 + 51, this.grille[i][j] < 0);
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
            grille: this.grille,
            tourRond: this.tourRond,
            nbCoups: this.nbCoups,
            joueur1: this.inputJ1.value,
            joueur2: this.inputJ2.value,
            gagnant: this.gagnant,
        };
        localStorage.setItem('morpion', JSON.stringify({
            resultats: this.resultats,
            parties: this.parties
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
            grille: this.grille,
            tourRond: this.tourRond,
            nbCoups: this.nbCoups,
            joueur1: this.inputJ1.value,
            joueur2: this.inputJ2.value,
            gagnant: false
        }];
        this.mettreAJourPartie();
    };

    /**
     * Méthode pour créer le panneau de controle :
     *  - noms des joueurs
     *  - réinitialisation de la grille ou de la partie
     *  - Possibilite de jouer automatiquement le tour des ronds (joueur 2 auto)
     *  - Possibilite de remplir la grille en un clic (partie auto)
     */
    initialiserControles = ()=>{
        this.labelJ1 = document.createElement('label');
        this.labelJ1.innerHTML = 'Joueur 1 : ';
        this.labelJ1.setAttribute('for', 'inputJ1');

        this.inputJ1 = document.createElement('input');
        this.inputJ1.setAttribute('id', 'inputJ1');
        this.inputJ1.setAttribute('value', 'joueur1');

        this.labelJ2 = document.createElement('label');
        this.labelJ2.innerHTML = 'Joueur 1 : ';
        this.labelJ2.setAttribute('for', 'inputJ2');

        this.inputJ2 = document.createElement('input');
        this.inputJ2.setAttribute('id', 'inputJ2');
        this.inputJ2.setAttribute('value', 'joueur2');

        this.labelBot = document.createElement('label');
        this.labelBot.innerHTML = 'Joueur 2 auto : ';
        this.labelBot.setAttribute('for', 'boutonBot');

        this.boutonBot = document.createElement('input');
        this.boutonBot.setAttribute('id', 'boutonBot');
        this.boutonBot.setAttribute('type', 'checkbox');
        this.boutonBot.onchange = el => this.bot = el.target.checked;

        this.labelDebug = document.createElement('label');
        this.labelDebug.innerHTML = 'Partie auto : ';
        this.labelDebug.setAttribute('for', 'boutonDebug');

        this.boutonDebug = document.createElement('input');
        this.boutonDebug.setAttribute('id', 'boutonDebug');
        this.boutonDebug.setAttribute('type', 'checkbox');
        this.boutonDebug.onchange = el => this.debug = el.target.checked;

        this.boutonReinitialiserGrille = document.createElement('button');
        this.boutonReinitialiserGrille.innerHTML = 'Réinitialiser la grille';
        this.boutonReinitialiserGrille.onclick = this.reinitialiserGrille;

        this.boutonReinitialiserPartie = document.createElement('button');
        this.boutonReinitialiserPartie.innerHTML = 'Réinitialiser la partie';
        this.boutonReinitialiserPartie.onclick = this.reinitialiserPartie;

        this.bot = this.boutonBot.checked;
        this.debug = this.boutonDebug.checked;

        this.controlsPanel = document.createElement('fieldset');
        this.controlsPanel.style.height = 'fit-content';

        this.controlsPanelLegend = document.createElement('legend');
        this.controlsPanelLegend.innerHTML = 'Morpion 5x5';

        this.controlsPanel.append(this.controlsPanelLegend);
        this.controlsPanel.append(this.labelJ1, document.createElement('br'), this.inputJ1, document.createElement('br'));
        this.controlsPanel.append(this.labelJ2, document.createElement('br'), this.inputJ2, document.createElement('br'));
        this.controlsPanel.append(this.labelBot, this.boutonBot, document.createElement('br'));
        this.controlsPanel.append(this.labelDebug, this.boutonDebug, document.createElement('br'));
        this.controlsPanel.append(this.boutonReinitialiserGrille, this.boutonReinitialiserPartie);

        document.body.append(this.controlsPanel);
        document.body.style.display = 'flex';
        document.body.style.alignItems = 'center';
        document.body.style.justifyContent = 'space-around';
    };

    dessinerGrille = ()=>{
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        for (let i = 1; i < 615; i+=102) {
            this.ctx.stroke();
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(510, i);
            this.ctx.moveTo(i, 0);
            this.ctx.lineTo(i, 510);
        }
        this.ctx.closePath();
    };

    /**
     * Méthode appellée à chaque coup joué
     * (par le joueur ou un bot)
     * @param evt
     */
    jouerCoup = (evt)=>{
        let coordX = evt ? Math.trunc(evt.layerX / 102) : random(0, this.grille.length-1);
        let coordY = evt ? Math.trunc(evt.layerY / 102) : random(0, this.grille.length-1);

        /*Le coup est valide*/
        if(this.grille[coordY][coordX] === 0) {
            this.ajouterJeton(coordX * 102 + 51, coordY * 102 + 51);
            this.grille[coordY][coordX] = this.tourRond ? -1 : 1;
            this.tourRond = !this.tourRond;
            this.labelJ1.innerHTML = `Joueur 1 (${this.resultats[0]} victoires)${this.tourRond ? '' : '>>>>'}`;
            this.labelJ2.innerHTML = `Joueur 2 (${this.resultats[1]} victoires)${this.tourRond ? '>>>>' : ''}`;
            this.mettreAJourPartie();
            if (this.verifierFin()){
                (this.tourRond) ? this.resultats[0]++ : this.resultats[1]++;
                this.finPartie((this.tourRond ? this.inputJ1.value : this.inputJ2.value)+' gagne !');
                return;
            }
            else if(this.nbCoups === 24) {
                this.resultats[2]++;
                this.finPartie('Egalité !');
                return;
            }
            else this.nbCoups++;
            if((this.bot && this.tourRond && this.nbCoups < this.grille.length*this.grille.length) || (this.debug) )this.jouerCoup();
        }
        /*Le coup n'est pas valide : le bot rejoue et le joueur doit recliquer*/
        else if(!evt)
            this.jouerCoup();
    };

    ajouterJeton = (x,y, tourRond = this.tourRond)=>{
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 10;
        this.ctx.globalAlpha = 1;
        this.ctx.lineJoin = 'round';
        this.ctx.beginPath();
        if(tourRond)
            this.ctx.arc(x, y, 30, 0, Math.PI*2);
        else{
            this.ctx.moveTo(x-34, y-34);
            this.ctx.lineTo(x+34, y+34);
            this.ctx.moveTo(x-34, y+34);
            this.ctx.lineTo(x+34, y-34);
        }
        this.ctx.stroke();
        this.ctx.closePath();
    };

    verifierFin = ()=>{
        let len = this.grille.length-1;

        let i = 0;
        while(i <= len){
            let j = 0;
            while(j < 2){

                let winRow = (this.grille[i][j] + this.grille[i][1+j] + this.grille[i][2+j] + this.grille[i][3+j]) === -4 || (this.grille[i][j] + this.grille[i][1+j] + this.grille[i][2+j] + this.grille[i][3+j]) === 4;
                let winCol = (this.grille[j][i] + this.grille[1+j][i] + this.grille[2+j][i] + this.grille[3+j][i]) === -4 || (this.grille[j][i] + this.grille[1+j][i] + this.grille[2+j][i] + this.grille[3+j][i]) === 4;
                if(winCol || winRow) return true;

                if(i < 2) {
                    let diagHGBD = this.grille[i][j] + this.grille[i + 1][j + 1] + this.grille[i + 2][j + 2] + this.grille[i + 3][j + 3];
                    let diagBDHG = this.grille[j][i] + this.grille[j + 1][i + 1] + this.grille[j + 2][i + 2] + this.grille[j + 3][i + 3];
                    let diagHDBG = this.grille[i][len - j] + this.grille[i + 1][len - j - 1] + this.grille[i + 2][len - j - 2] + this.grille[i + 3][len - j - 3];
                    let diagBGHD = this.grille[len - j][len - i] + this.grille[len - j - 1][len - i - 1] + this.grille[len - j - 2][len - i - 2] + this.grille[len - j - 3][len - i - 3];

                    if ((Math.abs(diagHGBD) === 4) || (Math.abs(diagBDHG) === 4) || (Math.abs(diagHDBG) === 4) || (Math.abs(diagBGHD) === 4)) return true;
                }
                ++j;
            }
            ++i;
        }
    };

    finPartie(message = null){
        this.gagnant = true;
        this.labelJ1.innerHTML = 'Joueur 1 ('+this.resultats[0]+' victoires) : ';
        this.labelJ2.innerHTML = 'Joueur 2 ('+this.resultats[1]+' victoires) : ';
        if(message) {
            this.ctx.fillStyle = 'rgba(200,200,200,0.9)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.font = "50px Comic Sans MS";
            this.ctx.fillStyle = "red";
            this.ctx.textAlign = "center";
            this.ctx.fillText(message, this.canvas.width / 2, this.canvas.height / 2);

            this.ctx.font = "30px Comic Sans MS";
            this.ctx.fillStyle = "black";
            this.ctx.fillText('Cliquer pour recommencer', this.canvas.width / 2, this.canvas.height-20);

            this.initialiserValeurs();
            this.parties.push( {
                grille: this.grille,
                tourRond: this.tourRond,
                nbCoups: this.nbCoups,
                joueur1: this.inputJ1.value,
                joueur2: this.inputJ2.value,
                gagnant: false
            });
            this.mettreAJourPartie();
            this.canvas.onclick = ()=>this.finPartie();
        }else{
            this.dessinerGrille();
            this.canvas.onclick = this.jouerCoup;
        }
    }
}
mp = new Morpion();