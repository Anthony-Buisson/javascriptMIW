function Xhr() {
    let obj = null;
    try{obj = new ActiveXObject("Microsoft.XMLHTTP");}
    catch (Error) { try {obj = new ActiveXObject("MSXML2.XMLHTTP");}
    catch (Error) { try {obj = new XMLHttpRequest();}
    catch(Error) { alert('Impossible de créer l\'objet XMLHttpRequest');}}}
    return obj;
}

let ajaxCat = function(){
    let req = Xhr();
    req.open("GET", "resources/categories.php", true);
    req.send(null);
    req.onreadystatechange = function () {
        if (this.readyState === this.DONE) {
            let codes = req.responseXML.getElementsByTagName('codeCat');
            let libelles = req.responseXML.getElementsByTagName('libCat');
            for (let i = 0; i < codes.length; i++) {
                let option = _cn('option', {value: codes[i].firstChild.data}, {}, selectCat);
                _ct(libelles[i].firstChild.data, option);
            };
        }
    }
};
let ajaxProd = function(){
    selectProd.innerHTML = '';
    let req = Xhr();
    req.open("POST", "resources/produits.php", true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send("codeCat="+this.value);
    let idCat = this.value;

    req.onreadystatechange = function () {
        if (this.readyState === this.DONE) {
            let produits = JSON.parse(req.responseText);
            for(let i = 0; i< produits.length ;i++) {
                if(produits[i]['codeCat'] != idCat) continue;
                let option = _cn('option', {value: produits[i]['numPro']}, {}, selectProd);
                _ct(produits[i]['libPro'], option);
            };
        }
    }
};

let form = _ce('form', document.body);
let selectCat = _ce('select', form);
let selectProd = _ce('select', form);
ajaxCat();

selectCat.onchange = ajaxProd;