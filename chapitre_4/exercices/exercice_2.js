String.prototype.left = function (n) {
    let str = '';
    for (let i = 0; i < n; i++) {
        str+=this[i];
    }
    return str;
};

String.prototype.right = function (n) {
    let str = '';
    for (let i = 1; i < n+1; i++) {
        str = this[this.length-i] + str;
    }
    return str;
};

String.prototype.capitalize = function () {
    let str = this[0].toUpperCase();
    for(let i = 1; i < this.length; i++) {
        str += this[i].toLowerCase();
    }
    return str;
};

String.prototype.trim = function () {
    let i = 0;
    let j = 0;
    let cpt = 0;
    while ((this[cpt] === ' ' || this[this.length-cpt-1] === ' ') && (cpt < Math.round(this.length/2))){
        if(this[cpt] === ' ') i++;
        if(this[this.length-cpt-1] === ' ') j++;
        cpt++;
    }
    return this.right(this.length-i) //enlève les espaces au début
        .left(this.length-i-j);      //enlève les espaces à la fin
};

let testString = '   Une chAinR de test  ';
console.log(testString.trim());
