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
    },
    attrib: function (obj) {
        let keys = Object.keys(obj);
        let values = Object.values(obj);
        for (let i = 0; i < keys.length; i++) {
            this.attributes[keys[i]] = values[i];
        }
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
