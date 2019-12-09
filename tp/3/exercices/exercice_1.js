function ajax() {
    let req = Xhr();
    req.open("GET", "resources/biblio.xml", false);
    req.send(null);
    if(req.status !== 200) return;

    /*CREATION TABLEAU, HEADERS, BODY*/
    let tableau = _ce('table', _('#resultat'));
    let headers = _ce('thead', tableau);
    ['Titre', 'Auteur', 'Genre', 'Editeur', 'Disponibilité'].forEach(function (header) {
        _ce('th',headers).appendChild(_ct(header));
    });
    bodyContainer = _ce('tbody', tableau);

    let livres = {livresDispo: [], livresIndispo: []};
    for(let i = 0; i < req.responseXML.getElementsByTagName('titre').length; i++) {
        let livre = {
            titre: req.responseXML.getElementsByTagName('titre')[i].firstChild.data,
            auteur: req.responseXML.getElementsByTagName('auteur')[i].firstChild.data,
            genre: req.responseXML.getElementsByTagName('genre')[i].firstChild.data,
            editeur: req.responseXML.getElementsByTagName('editeur')[i].firstChild.data,
            disponibilite: req.responseXML.getElementsByTagName('disponible')[i].firstChild.data
        };
        livre.disponibilite === 'oui' ? livres.livresDispo.push(livre) : livres.livresIndispo.push(livre);
    }
    return livres;
}

/**
 * Affiche une liste de maximum nbLivres livres (10 par défaut)
 * avec la pagination correspondante
 * @param livresAffiches la liste des livres a afficher et paginer
 * @param nextPagestart l'index de départ, utilisé pour la pagination
 * @param nbLivres Le nombre de livres par page
 */
function afficheCache(livresAffiches, nextPagestart = 0, nbLivres = 10) {
    bodyContainer.innerHTML = '';

    /*Affichage de n livres*/
    let i = nextPagestart;
    while ((i < livresAffiches.length) && (i-nextPagestart < nbLivres)){
        let livre = _ce('tr', bodyContainer);
        ['titre','auteur','genre','editeur','disponibilite'].forEach((attr)=>{
            _ce('td',livre).appendChild(_ct(livresAffiches[i][attr]));
        });
        i++;
    }

    /*Ajout des boutons suivant et/ou précédent selon le besoin*/
    if(nextPagestart > nbLivres-1){
        previous.style.display = 'inline-block';
        previous.onclick = ()=> afficheCache(livresAffiches, nextPagestart-nbLivres, nbLivres);
    }
    else previous.style.display = 'none';
    if((livresAffiches.length > nextPagestart+10) ){
        next.style.display = 'inline-block';
        next.onclick = ()=> afficheCache(livresAffiches, nextPagestart+nbLivres, nbLivres);
    }
    else next.style.display = 'none';
}

/*INITIALISATION EXERCICE + DONNEES*/
let exerciceContainer = _cn('div',{id: 'resultat'},{}, document.body);
let data = ajax();
let livresParPage= 10;

/*CREATION DES BOUTONS*/
let     previous = _cn('button', null, {display: 'none'},exerciceContainer);
let         next = _cn('button',{value: 'suivant'}, {display: 'none'},exerciceContainer);
let   butonDispo = _cn('input', {type: 'radio', id:'disponible',name:'dispo', value: 'oui', checked: true}, null, exerciceContainer);
let   labelDispo = _cn('label', {for: 'disponible'}, null, exerciceContainer);
let butonIndispo = _cn('input', {type: 'radio', id:'indisponible', name:'dispo', value: 'non'}, null, exerciceContainer);
let labelIndispo = _cn('label', {for: 'indisponible'}, null, exerciceContainer);

/*TEXTE DES BOUTONS*/
_ct('Précédent', previous);
_ct('Suivant', next);
_ct('Livres disponibles', labelDispo);
_ct('Livres non disponibles', labelIndispo);

/*ECOUTEURS SUR LES BOUTONS*/
butonDispo.onclick = ()=> afficheCache(data.livresDispo,0,livresParPage);
butonIndispo.onclick = ()=> afficheCache(data.livresIndispo,0,livresParPage);

/*AFFICHAGE PAR DEFAUT*/
afficheCache(data.livresDispo,0,livresParPage);