function Xhr(){                // création d'un requete HTTP en fonction du navigateur
    let obj = null;
    try { obj = new ActiveXObject("Microsoft.XMLHTTP");}
    catch(Error) { try { obj = new ActiveXObject("MSXML2.XMLHTTP");}
    catch(Error) { try { obj = new XMLHttpRequest();}
    catch(Error) { alert(' Impossible de créer l\'objet XMLHttpRequest')}
    }
    }
    return obj;
}

function ajax(list, nom) {
    if(nom.length < 1) return;
    let req = Xhr();
    req.open("GET", "resources/browsers.php?nom="+nom, true);
    req.send(null);
    req.onload = function () {
        if(this.status === 200) {
            updateList(list, JSON.parse(req.responseText));
        }
    };
}

let inputAuto = _cn('input', {list: 'browsers'}, null, document.body);
inputAuto.onkeyup = remplirDatalist;

let liste = _cn('datalist', {id: 'browsers'}, {visibility: 'visible'}, document.body);

function remplirDatalist() {
    ajax(liste, this.value);
}

function updateList(list, data){
    list.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        _cn('option', {value: data[i].nom}, null, list);
    }
}