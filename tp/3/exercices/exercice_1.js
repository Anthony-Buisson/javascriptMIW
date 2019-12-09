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

function ajax() {
    let req = Xhr();
    req.open("GET", "resources/biblio.xml", false);
    req.send(null);
    if(req.status !== 200) return;

    /*RECUPERATION DONNEES*/
    let titres = req.responseXML.getElementsByTagName('titre');
    let auteurs = req.responseXML.getElementsByTagName('auteur');
    let genres = req.responseXML.getElementsByTagName('genre');
    let editeurs = req.responseXML.getElementsByTagName('editeur');
    let disponibilites = req.responseXML.getElementsByTagName('disponible');

    /*CREATION TABLEAU, HEADERS, BODY*/
    let tableau = _ce('table', _('#resultat'));
    let headers = _ce('thead', tableau);
    ['Titre', 'Auteur', 'Genre', 'Editeur', 'Disponibilité'].forEach(function (header) {
        _ce('th',headers).appendChild(_ct(header));
    });
    let bodyContainer = _ce('tbody', tableau);


    let livre;
    for(let i = 0; i < titres.length; i++) {
        livre = _cn('tr',{},{display: 'none'});
        _ce('td',livre).appendChild(_ct(titres[i].firstChild.data));
        _ce('td',livre).appendChild(_ct(auteurs[i].firstChild.data));
        _ce('td',livre).appendChild(_ct(genres[i].firstChild.data));
        _ce('td',livre).appendChild(_ct(editeurs[i].firstChild.data));
        _ce('td',livre).appendChild(_ct(disponibilites[i].firstChild.data));
        bodyContainer.appendChild(livre);
    }

    return bodyContainer;
}

/**
 * Probleme : iteration sur le header pose un probleme dans le calcul d'indices
 *
 **/
_cn('div',{id: 'resultat'},{}, document.body);
let data = ajax();

let previous = _cn('button', null, {display: 'none'},document.body);
               _ct('Précédent', previous);

let next = _cn('button',{value: 'suivant'}, {display: 'none'},document.body);
           _ct('Suivant', next);

let butonDispo = _cn('input', {type: 'radio', id:'disponible',name:'dispo', value: 'oui', checked: true}, null, document.body);
let labelDispo = _cn('label', {for: 'disponible'}, null, document.body);
                 _ct('Livres disponibles', labelDispo);

let butonIndispo = _cn('input', {type: 'radio', id:'indisponible', name:'dispo', value: 'non'}, null, document.body);
let labelIndispo = _cn('label', {for: 'indisponible'}, null, document.body);
                   _ct('Livres non disponibles', labelIndispo);

butonDispo.onclick = changeDispo;
butonIndispo.onclick = changeDispo;

function changeDispo() {
    afficheCache(this.value, 1);
}

function resetDisplay(data) {
    let start = 0;
    while (start < data.childNodes.length){
        data.childNodes[start].style.display = 'none';
        start++;
    }
}
function afficheCache(dispo, nextPagestart) {
    let cpt = Number(nextPagestart);
    let i = nextPagestart;
    previous.style.display = 'none';
    next.style.display = 'none';

    resetDisplay(data);

    while ((i < data.childNodes.length) && (i-cpt < 10)){
        if(data.childNodes[i].childNodes[4].firstChild.data !== dispo){
            data.childNodes[i].style.display = 'none';
            ++cpt;
        }else{
            data.childNodes[i].style.display = '';
        }
        ++i;
    }

    if(nextPagestart > 9){
        previous.onclick = function () { afficheCache(dispo, nextPagestart-cpt); };
        previous.style.display = 'inline-block';
    }
    if((cpt >= nextPagestart) && (data.childNodes.length > (10+nextPagestart)) ){
        next.style.display = 'inline-block';
        next.onclick = function () { afficheCache(dispo, nextPagestart+(nextPagestart-cpt)+12); };
    }

    console.log('---DEBUG FIN---');
    console.log('Suivant   :'+(nextPagestart+10+cpt));
    console.log('precedent :'+(nextPagestart-cpt));
    console.log('cpt       :'+cpt);
    console.log('nextpage  :'+nextPagestart);
    console.log('i         :'+i);
    console.log('diff      :'+cpt);
    console.log('data.childNodes.length:'+data.childNodes.length);
}
afficheCache('oui', 0);