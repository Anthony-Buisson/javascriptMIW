let surface = function (figure) {
    switch (figure.forme) {
        case 'Carré':
            if(figure.cote) return (figure.cote >= 0 && isFinite(figure.cote)) ? figure.cote*figure.cote : -1;
            return -1;
        case 'Rectangle':
            if(figure.largeur && figure.longueur) return (figure.largeur >= 0 && isFinite(figure.largeur) && figure.longueur >= 0 && isFinite(figure.longueur)) ? figure.largeur*figure.longueur : -1;
            return -1;
        case 'Cercle':
            if(figure.rayon) return (figure.rayon >= 0 && isFinite(figure.rayon)) ? Math.PI * (figure.rayon*figure.rayon) : -1;
            return -1;
        default:
            return -1;
    }
};