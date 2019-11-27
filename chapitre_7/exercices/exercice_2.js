let ajaxCat = function(){
    let req = Xhr();
    req.open("GET", "resources/categories.php", true);
    req.send(null);
    req.onload = function () {
        if (this.status === 200) {
            let codes = req.responseXML.getElementsByTagName('codeCat');
            let libelles = req.responseXML.getElementsByTagName('libCat');
            let option = _ce('option', selectCat);
            _ct('---Choisir---', option);
            for (let i = 0; i < codes.length; i++) {
                option = _cn('option', {value: codes[i].firstChild.data}, {}, selectCat);
                _ct(libelles[i].firstChild.data, option);
            }
        }else{
            alert('Erreur');
        }
    };
};
let ajaxProd = function(){
    let idCat = this.value;
    if(!idCat) return;
    selectProd.innerHTML = '';
    let req = Xhr();

    req.open("POST", "resources/produits.php", true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send("codeCat="+this.value);
    req.onload = function () {
        if (this.status === 200) {
            let produits = JSON.parse(req.responseText);
            for(let i = 0; i < produits.length ;i++) {
                let option = _cn('option', {value: produits[i]['numPro']}, {}, selectProd);
                _ct(produits[i]['libPro'], option);
            }
        }else{
            alert('Erreur');
        }
    }
};

let selectCat = _ce('select', document.body);
let selectProd = _ce('select', document.body);

window.onload = ajaxCat;
selectCat.onchange = ajaxProd;
