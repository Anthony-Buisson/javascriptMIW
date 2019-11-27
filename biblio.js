/***OBJECT PROTOTYPES***/
Object.prototype.extend = function(obj){
    let keys = Object.keys(obj);
    let values = Object.values(obj);
    for (let i = 0; i < keys.length; i++) {
        Object.prototype[keys[i]] = values[i];
    }
};

/***NODE PROTOTYPES***/
Node.prototype.extend({
    /*change l'id de l'élément el*/
    changeId: function (val) {
        this.id = val;
        return this;
    },
    css: function (obj) {
        for (let i in obj) {
            this.style[i] = obj[i];
        }
    },
    attrib: function (obj) {
        for (let i in obj) {
            this.setAttribute(i, obj[i]);
        }
    }
});

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
    },
    substitue: function(c1, c2) {
        return this.split(c1).join(c2);
    }
});

/***ARRAY PROTOTYPE***/
Array.prototype.extend({
    merge: function (t) {
        let tab = this;
        t.forEach(function (el) {
            tab.push(el);
        });
        return tab;
    }
});

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

_id = function(id){
    return document.getElementById(id);
};
_tn = function(n){
    return document.getElementsByTagName(n);
};
_n = function(n){
    return document.getElementsByName(n);
};
_ = function(css){
    if(document.querySelectorAll(css).length === 1){return document.querySelector(css)}
    else return document.querySelectorAll(css);
};
_cf = function(){
    return document.createDocumentFragment();
};
_ce = function(el, nodeIns){
    let e = document.createElement(el);
    if(nodeIns) nodeIns.appendChild(e);
    return e;
};
_ct = function(tx,nodeIns){
    let t = document.createTextNode(tx);
    if(nodeIns) nodeIns.appendChild(t);
    return t;
};
_cn = function(node, attribut, style, nodeIns){
    let n = _ce(node);
    n.attrib(attribut);
    n.css(style);
    if(nodeIns) nodeIns.appendChild(n);
    return n;
};
_dn = function(node){
    node.parentNode.removeChild(node);
};

_each = function(o,f){
    for (let i in o) { f(i,o[i]) }
};

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

function random(min, max) {
    return Math.floor(Math.random() * (max+1 - min) + min);
}

function Xhr() {
    let obj = null;
    try{obj = new ActiveXObject("Microsoft.XMLHTTP");}
    catch (Error) { try {obj = new ActiveXObject("MSXML2.XMLHTTP");}
    catch (Error) { try {obj = new XMLHttpRequest();}
    catch(Error) { alert('Impossible de créer l\'objet XMLHttpRequest');}}}
    return obj;
}

function jsonToUrl(data) {
    if(!data) return;
    let url = '';
    for(let i = 0; i < Object.keys(data).length; i++){
        if((typeof Object.values(data)[i] !== 'string') && (typeof Object.values(data)[i] !== 'number')) continue;
        url += encodeURI(Object.keys(data)[i])+'='+encodeURI(Object.values(data)[i].toString())+'&';
    }
    url.split('').pop();
    return url;
}

function $get(url, data, done, error) {
    let req = Xhr();
    req.open("GET", url+'?'+jsonToUrl(data)+'&'+Date.now(), true);
    req.send(null);
    req.onload = (this.status === 200) ? done : error;

}

function $post(url, data, done, error) {
    let req = Xhr();
    req.open("POST", url+'?'+Date.now(), true);
    req.send(jsonToUrl(data)+Date.now());
    req.onload = function () {
        (this.status === 200) ? done() : error();
    }
}