for (let i = 0; i < 4; i++) {
    let gris = _cn('div', {},{position: 'absolute', top: i*210+'px', left: 0, 'background-color': 'grey', width: '200px', height: '200px'}, document.body);
    let vert = _cn('div', {},{'background-color': 'green', width: '100px', height: '100px'}, gris);
    if(i === 0){
        gris.addEventListener('click', handleGris, false);
        vert.addEventListener('click', handleVert, false);
    }
    if(i === 1){
        gris.addEventListener('click', handleGris, true);
        vert.addEventListener('click', handleVert, true);
    }
    if(i === 2){
        gris.addEventListener('click', handleGrisCas3, false);
        vert.addEventListener('click', handleVertCas3, false);
    }
    if(i === 3){
        gris.addEventListener("mousedown", handleGrisCas4Down, true);
        gris.addEventListener("mouseup", handleGrisCas4Up, true);
        vert.addEventListener('click', handleVertCas3, false);
    }
}

function handleGris() { alert('Gris'); }
function handleVert() { alert('Vert'); }

function handleGrisCas3(event) { alert('Gris'); event.stopPropagation();}
function handleVertCas3(event) { alert('Vert'); event.stopPropagation();}

function handleGrisCas4Down(event) {
    console.log('down');
    dx = (event.clientX - parseInt(this.style.left));
    dy = (event.clientY - parseInt(this.style.top));
    this.addEventListener('mousemove', handleGrisCas4, true);
    event.stopPropagation();
}

function handleGrisCas4Up(event) {
    this.removeEventListener('mousemove', handleGrisCas4, true);
    event.stopPropagation();
}

function handleGrisCas4(event) {
    this.style.top = event.clientY - dy + 'px';
    this.style.left = event.clientX - dx + 'px';
    event.stopPropagation();
}