
class Morpion {
    grid = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
    ];
    tourRond = false;

    constructor(){
        this.canvas = document.querySelector('#morpionZone');
        this.canvas.onclick = this.jouerCoup;

        this.ctx = this.canvas.getContext('2d');
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

    jouerCoup = (evt)=>{
        let coordX = Math.trunc(evt.layerX/102);
        let coordY = Math.trunc(evt.layerY/102);

        if(this.grid[coordY][coordX] === 0) {
            this.ajouterJeton(coordX * 102 + 51, coordY * 102 + 51);
            this.grid[coordY][coordX] = this.tourRond ? -1 : 1;
            this.tourRond = !this.tourRond;
            if (this.verifierFin()) alert('Bravo '+(this.tourRond ? 'joueur Carré' : 'joueur Rond')+'!');
        }
        console.log('Grille : ');
        console.log(this.grid);
    };

    ajouterJeton = (x,y)=>{
        this.ctx.beginPath();
        this.ctx.fillStyle = this.tourRond ? "green" : "red";
        this.tourRond ? this.ctx.arc(x, y, 40, 0, Math.PI*2) : this.ctx.fillRect(x-34, y-34, 70, 70);
        this.ctx.fill();
        this.ctx.closePath();
    };

    verifierFin = ()=>{
        let i = 0;
        while(i < this.grid.length){
            console.log(this.grid[i].slice(0, this.grid.length-2).reduce((accumulator, currentValue) => accumulator + currentValue));
            if([-4,4].indexOf(this.grid[i].slice(0, this.grid.length-2).reduce((accumulator, currentValue) => accumulator + currentValue)) !== -1) return true;
            if([-4,4].indexOf(this.grid[i].slice(1, this.grid.length-1).reduce((accumulator, currentValue) => accumulator + currentValue)) !== -1) return true;
            ++i;
        }
    }
}
mp = new Morpion();