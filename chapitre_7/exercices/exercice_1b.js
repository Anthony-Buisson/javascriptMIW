function Xhr() {
    let obj = null;
    try{obj = new ActiveXObject("Microsoft.XMLHTTP");}
    catch (Error) { try {obj = new ActiveXObject("MSXML2.XMLHTTP");}
    catch (Error) { try {obj = new XMLHttpRequest();}
    catch(Error) { alert('Impossible de créer l\'objet XMLHttpRequest');}}}
    return obj;
}

function ajax() {
    let req = Xhr();
    req.open("GET", "resources/sourceXml.xml", true);
    req.send(null);
    let tableau = _cn('table');
    let client;
    req.onreadystatechange = function () {
        if(this.readyState === this.DONE) {
            let noms = req.responseXML.getElementsByTagName('nom');
            let ages = req.responseXML.getElementsByTagName('age');
            let prenoms = req.responseXML.getElementsByTagName('prenom');
            for(let i = 0; i < noms.length; i++) {
                client = _cn('tr');
                client.appendChild(_cn('td').appendChild(document.createTextNode(noms[i].firstChild.data)));
                client.appendChild(_cn('td').appendChild(document.createTextNode(prenoms[i].firstChild.data)));
                client.appendChild(_cn('td').appendChild(document.createTextNode(ages[i].firstChild.data)));
                tableau.appendChild(client);
            }
            _('#resultat').appendChild(tableau);
        }
    };
    _('a').style.visibility = 'hidden';
}