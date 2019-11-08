Object.prototype.extend = function(obj){
    let keys = Object.keys(obj);
    let values = Object.values(obj);
    for (let i = 0; i < keys.length; i++) {
        Object.prototype[keys[i]] = values[i];
    }
};
/***STRING PROTOTYPES***/
String.prototype.extend({
    left: function (n) {
        let str = '';
        for (let i = 0; i < n; i++) {
            str+=this[i];
        }
        return str;
    },
    right: function (n) {
        let str = '';
        for (let i = 1; i < n+1; i++) {
            str = this[this.length-i] + str;
        }
        return str;
    },
    capitalize: function () {
        let str = this[0].toUpperCase();
        for(let i = 1; i < this.length; i++) {
            str += this[i].toLowerCase();
        }
        return str;
    },
    trim: function () {
        let i = 0;
        let j = 0;
        let cpt = 0;
        while ((this[cpt] === ' ' || this[this.length-cpt-1] === ' ')){
            if(this[cpt] === ' ') i++;
            if((this[this.length-cpt-1] === ' ')) j++;
            cpt++;
        }
        return this.right(this.length-i) //enlève les espaces au début
            .left(this.length-i-j);      //enlève les espaces à la fin
    }
});
/*
let testString = '       123  ';
console.log(testString.trim());
*/

/***ARRAY PROTOTYPE***/
Array.prototype.extend({
    merge: function (t) {
        let tab = this;
        console.log(this);
        t.forEach(function (el) {
            tab.push(el);
            console.log(this);
        });
        return tab;
    }
});
/*
let t1 = ["Thomas", "Eric"];
let t2 = ["Léo"];
console.log(t1.merge(t2));
console.log(t1);
*/

/***NUMBER PROTOTYPE***/
Number.prototype.extend({
    p: function (n) {
        console.log(this);
        let nb = this;
        while ( n > 1){
            nb *= this;
            n--;
        }
        return nb;
    }
});
/*
let number = 5;
console.log(number.p(3));
*/

/***NODE PROTOTYPES***/
Node.prototype.extend({
    /*change l'id de l'élément el*/
    changeId: function (val) {
        this.id = val;
        return this;
    },
    css: function (obj) {
        let keys = Object.keys(obj);
        let values = Object.values(obj);
        for (let i = 0; i < keys.length; i++) {
            this.style[keys[i]] = values[i];
        }
    }
});
/*
let el = document.createElement("p");
el.changeId('monid');
el.css({"width":"60px","height":"60px"});
document.body.appendChild(el);
*/