function nombre(n) {
    return !isNaN(parseFloat(n));
}
function entierPositif(n) {
    return (parseInt(n)===parseFloat(n) && n>=0);
}
function pair(x){
    return x%2===0;
}
function arrondi(x,n){
    return x.toFixed(n);
}
function nbOccurences(c,ch){
    return ch.match(new RegExp(c.toString(),'g')).length;
}
function substitue(c1,c2,c){
    return c.replace(new RegExp(c1.toString(), 'g'),c2);
}