//Merci pour les exos
let a = prompt("Saisi un nombre pd");
function somme(n){
    let somme =0;
    n = parseInt(n);
    while(n!=0){
        somme = somme + n;
        n--;
    }
    return somme;
}

alert(somme(a));