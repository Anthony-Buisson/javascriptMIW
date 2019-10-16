let N1 = parseInt(prompt("Choisissez un nombre : "));
let N2 = parseInt(prompt("Choissisez un nombre plus grand que le premier : "));

while(N1>N2){

    N2 = parseInt(prompt("Le deuxième nombre n'est pas plus grand que le premier"));
}
let T = [];

while(N1<=N2){
    if(pair(N1)){
        T.push(N1);
    }
    N1++;
}
alert(T.toString());

