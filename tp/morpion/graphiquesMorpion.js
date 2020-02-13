export class GraphiquesMorpion {
    constructor(){
        this.canvas = document.querySelector('#morpionZone');
        this.ctx = this.canvas.getContext('2d');
        this.cellSize = 102; //doit etre pair
        this.canvas.height = (this.cellSize*5+2);
        this.canvas.width = (this.cellSize*5+2);
    }

    dessinerGrille = ()=>{
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        for (let i = 1; i < this.cellSize*7+1; i+=this.cellSize) {
            this.ctx.stroke();
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(this.cellSize*5, i);
            this.ctx.moveTo(i, 0);
            this.ctx.lineTo(i, this.cellSize*5);
        }
        this.ctx.closePath();
    };

    afficherTour = (resultats, tourRond)=>{
        if(tourRond){
            this.labelCroix.innerHTML = `Croix (${resultats[0]} victoires)`;
            this.labelRonds.innerHTML = `<b>Ronds (${resultats[1]} victoires) >>></b>`;
        }else{
            this.labelCroix.innerHTML = `<b>Croix (${resultats[0]} victoires) >>></b>`;
            this.labelRonds.innerHTML = `Ronds (${resultats[1]} victoires)`;
        }
    };

    /**
     * Méthode pour créer le panneau de controle :
     *  - noms des joueurs
     *  - réinitialisation de la grille ou de la partie
     *  - Possibilite de jouer automatiquement le tour des ronds (joueur 2 auto)
     *  - Possibilite de remplir la grille en un clic (partie auto)
     */
    afficherPanneauControles = ()=>{
        this.controlsPanel = document.createElement('fieldset');
        this.controlsPanel.style.height = 'fit-content';
        this.controlsPanelLegend = document.createElement('legend');
        this.controlsPanelLegend.innerHTML = 'Morpion 5x5';
        this.controlsPanel.append(this.controlsPanelLegend);

        this.labelCroix = document.createElement('label');
        this.labelCroix.innerHTML = 'Joueur 1 : ';
        this.labelCroix.setAttribute('for', 'croix');
        this.inputCroix = document.createElement('input');
        this.inputCroix.setAttribute('id', 'croix');
        this.inputCroix.setAttribute('value', 'croix');
        this.controlsPanel.append(this.labelCroix, document.createElement('br'), this.inputCroix, document.createElement('br'));

        this.labelRonds = document.createElement('label');
        this.labelRonds.innerHTML = 'Joueur 1 : ';
        this.labelRonds.setAttribute('for', 'ronds');
        this.inputRonds = document.createElement('input');
        this.inputRonds.setAttribute('id', 'ronds');
        this.inputRonds.setAttribute('value', 'ronds');
        this.controlsPanel.append(this.labelRonds, document.createElement('br'), this.inputRonds, document.createElement('br'));

        this.labelBot = document.createElement('label');
        this.labelBot.innerHTML = 'Ronds auto : ';
        this.labelBot.setAttribute('for', 'boutonBot');
        this.boutonBot = document.createElement('input');
        this.boutonBot.setAttribute('id', 'boutonBot');
        this.boutonBot.setAttribute('type', 'checkbox');
        this.controlsPanel.append(this.labelBot, this.boutonBot, document.createElement('br'));

        this.labelDebug = document.createElement('label');
        this.labelDebug.innerHTML = 'Partie auto : ';
        this.labelDebug.setAttribute('for', 'boutonDebug');
        this.boutonDebug = document.createElement('input');
        this.boutonDebug.setAttribute('id', 'boutonDebug');
        this.boutonDebug.setAttribute('type', 'checkbox');
        this.controlsPanel.append(this.labelDebug, this.boutonDebug, document.createElement('br'));

        this.boutonReinitialiserGrille = document.createElement('button');
        this.boutonReinitialiserGrille.innerHTML = 'Réinitialiser la grille';
        this.boutonReinitialiserPartie = document.createElement('button');
        this.boutonReinitialiserPartie.innerHTML = 'Réinitialiser la partie';
        this.controlsPanel.append(this.boutonReinitialiserGrille, this.boutonReinitialiserPartie);

        document.body.append(this.controlsPanel);
        document.body.style.display = 'flex';
        document.body.style.alignItems = 'center';
        document.body.style.justifyContent = 'center';
    };

    afficherJeton = (xCoord, yCoord, tourRond)=>{
        let x = xCoord*this.cellSize + this.cellSize/2;
        let y = yCoord*this.cellSize + this.cellSize/2;
        let drawSize = this.cellSize/3;
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 10;
        this.ctx.globalAlpha = 1;
        this.ctx.lineJoin = 'round';
        this.ctx.beginPath();
        if(tourRond)
            this.ctx.arc(x, y, drawSize, 0, Math.PI*2);
        else{
            this.ctx.moveTo(x-drawSize, y-drawSize);
            this.ctx.lineTo(x+drawSize, y+drawSize);
            this.ctx.moveTo(x-drawSize, y+drawSize);
            this.ctx.lineTo(x+drawSize, y-drawSize);
        }
        this.ctx.stroke();
        this.ctx.closePath();
    };

    /**
     * Affiche le message de fin et grise la grille
     * @param message
     */
    afficherEcranFin = (message)=>{
        this.ctx.fillStyle = 'rgba(200,200,200,0.9)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.font = `${this.cellSize/2}px Comic Sans MS`;
        this.ctx.fillStyle = "red";
        this.ctx.textAlign = "center";
        this.ctx.fillText(message, this.canvas.width / 2, this.canvas.height / 2);

        this.ctx.font = `${this.cellSize/3}px Comic Sans MS`;
        this.ctx.fillStyle = "black";
        this.ctx.fillText('Cliquer pour recommencer', this.canvas.width / 2, this.canvas.height-20);
    };
}
