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
    req.open("GET", url+Date.now(), true);
    req.send('?'+jsonToUrl(data)+Date.now());
    req.onload = function () {
        (this.status === 200) ? done() : error();
    }
}

function $post(url, data, done, error) {
    let req = Xhr();
    req.open("POST", url+Date.now(), true);
    req.send(jsonToUrl(data)+Date.now());
    req.onload = function () {
        (this.status === 200) ? done() : error();
    }
}

console.log(jsonToUrl({'produit': 1, 'id': 2}));