function maxi() {
    if(arguments.length === 0) throw new SyntaxError('Nombre d\'arguments insuffisant');
    let max = null;
    for (let i = 0; i < arguments.length; i++) {
        if(isNaN(arguments[i])) throw new TypeError('Tous les paramètres doivent être des nombres');
        if(arguments[i]>max) max = arguments[i];
    }
    return max;
}
try {//renvoie une erreur de type syntaxError
    console.log(maxi());
}catch (e) {
    console.error(e);
}
try {//renvoie 20
    console.log(maxi(2,3,4,3,-9,20,0));
}catch (e) {
    console.error(e);
}
try {//renvoie une erreur de type typeError
    console.log(maxi(2,"test",-6,8,2,[2,2]));
}catch (e) {
    console.error(e);
}

