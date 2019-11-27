function ajax() {
    let req = Xhr();
    req.open("GET", "resources/sourceHtml.txt", false);
    req.send(null);
    _('#resultat').innerHTML = req.responseText;
    _('a').style.visibility = 'hidden';
}

_cn('div',{id: 'resultat'},{}, document.body);
let link = _cn('a',{href: 'javascript:ajax();'},{}, document.body);
_ct('Clique !', link);