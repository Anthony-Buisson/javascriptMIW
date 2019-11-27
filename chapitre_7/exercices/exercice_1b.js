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
                _ce('td',client).appendChild(_ct(noms[i].firstChild.data));
                _ce('td',client).appendChild(_ct(prenoms[i].firstChild.data));
                _ce('td',client).appendChild(_ct(ages[i].firstChild.data));
                tableau.appendChild(client);
            }
            _('#resultat').appendChild(tableau);
        }
    };
    _('a').style.visibility = 'hidden';
}

_cn('div',{id: 'resultat'},{}, document.body);
let link = _cn('a',{href: 'javascript:ajax();'},{}, document.body);
_ct('Clique !', link);