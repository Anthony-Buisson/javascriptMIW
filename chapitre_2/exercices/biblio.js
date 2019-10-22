function nombre(n) {
    return n.match('^[+-]?((\\d+\\.?\\d*)|(\\d*\\.?\\d+))$') !== null;
}
function entierPositif(n) {
    return (parseInt(n)===parseFloat(n) && n>=0 && nombre(n));
}
function pair(x){
    return x%2===0 && entierPositif(x.toString());
}
function arrondi(x,n){
    return x.toFixed(n);
}
function nbOccurences(c,ch){
    return ch.match(new RegExp(c,'g')).length;
}
function substitue(c1,c2,c){
    return c.split(c1).join(c2);
}

//String prototype
String.prototype.substitue = function(c1, c2){ return this.split(c1).join(c2); }
