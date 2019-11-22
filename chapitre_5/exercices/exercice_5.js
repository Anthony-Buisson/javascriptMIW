
class JeuImage {
    constructor(img){
        this.img = img;
        this.img.style['position'] = 'absolute';
        this.vitesse = random(1,3);
        this.pX = this.vitesse%3 === 0 ? this.vitesse : -this.vitesse;
        this.pY = this.vitesse%2 === 0 ? this.vitesse : -this.vitesse;
        this.affiche(random(0,this.windowWidth()-this.img.width),random(0,this.windowHeight()-this.img.height));
        this.img.style.backgroundColor = 'blue';
        this.img.style['border-radius'] = '50%';
        this.deplace();
    };

    affiche(x,y){
        this.x = x;
        this.y = y;
        this.img.style.top = this.y+"px";
        this.img.style.marginLeft = this.x+"px";
    };

    deplace(){
        this.img.onmouseover = ()=>{this.efface()};
        if(this.x+100 >= this.windowWidth()){
            this.pX = -this.vitesse;
            this.changeCouleur();
        }else if(this.x < 0) {
            this.pX = this.vitesse;
            this.changeCouleur();
        }
        if(this.y+100 >= this.windowHeight()){
            this.pY = -this.vitesse;
            this.changeCouleur();
        }else if(this.y < 0) {
            this.pY = this.vitesse;
            this.changeCouleur();
        }
        this.affiche(this.x+this.pX,this.y+this.pY);
        setTimeout(()=>{this.deplace()},10);
    };

    changeCouleur(){
        this.img.style.backgroundColor = 'rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')';
    }
    efface(){
        _dn(this.img);
    };

    windowWidth(){
        if(window.innerWidth) return window.innerWidth;
        else if(document.documentElement.clientWidth) return document.documentElement.clientWidth;
        else if(document.body.clientWidth) return document.body.clientWidth;
        else return -1;
    };

    windowHeight(){
        if(window.innerHeight) return window.innerHeight;
        else if(document.documentElement.clientHeight) return document.documentElement.clientHeight;
        else if(document.body.clientHeight) return document.body.clientHeight;
        else return -1;
    };

}

for (let i = 0; i < 100; i++) {
    new JeuImage(_cn('img', {src: 'img/Soccerball.svg', width: '100px', height: '100px'}, {}, document.body));
}
