//Merci pour les exos
let a = prompt("Saisi un nombre pd");
function somme(n){
    n = parseInt(n);
    let somme = n*(n+1)/2;
    return somme;
}
if(isNaN((somme(a)))){
    alert("Le nombre entré n'est pas un nombre");
}else{
    alert(somme(a));
}

