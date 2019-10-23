document.getElementById('exercice').innerHTML =
    '<ul>' +
        '<li style="margin-bottom: 40px" onclick="openDocument(\'Accueil\')" onmouseover="changeImg(this, true)" onmouseout="changeImg(this)">ACCUEIL<img src="./img/home1.png"></li>' +
        '<li style="margin-bottom: 40px" onclick="openDocument(\'Liens\')" onmouseover="changeImg(this, true)" onmouseout="changeImg(this)">LIENS<img src="./img/link1.png"></li>' +
        '<li style="margin-bottom: 40px" onclick="openDocument(\'Livre\')" onmouseover="changeImg(this, true)" onmouseout="changeImg(this)">LIVRE D\'OR<img src="./img/book1.png"></li>' +
        '<li onclick="openDocument(\'E-mail\')" onmouseover="changeImg(this, true)" onmouseout="changeImg(this)">E-MAIL<img src="./img/mail1.png"></li>' +
    '</ul>';

function openDocument(title) {
    let f = open("","");
    f.document.write(title);
}

function changeImg(el, hover = false) {
    let img =  el.getElementsByTagName('img')[0];
    if(hover)
        img.setAttribute('src', img.getAttribute('src').replace('1','2'));
    else{
        img.setAttribute('src', img.getAttribute('src').replace('2','1'));
    }
}