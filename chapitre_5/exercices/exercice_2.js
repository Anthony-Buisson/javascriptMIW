class ISBN {
    constructor() {
        this.isbn = null;
        if (typeof ISBN.id =="undefined" ) { ISBN.id=1}
        else ISBN.id++;
    }

    static isbnFormat = /^97[89]-\d-\d{5}-\d{3}-\d$/;

    conformeISBN(){
        return ISBN.isbnFormat.test(this.isbn);
    };

    valideISBn() {
        let n = this.isbn.split('-');
        let key = n.pop()*1;
        n = n.join('').split('');
        //n n'a plus de tirets et la clé est sauvegardée à part
        let somme = 0;
        for (let i = 0; i < n.length; i++) {
            somme+= (i%2 === 0) ? n[i]*1 : n[i]*3;//pair = *1 pour en faire un nombre, impair = *3
        }
        somme+=key;
        return somme%10 === 0;
    };

    test(){
        if(this.isbn.length === 0)
            return 'Saisir un numéro ISBN';
        else if(!this.conformeISBN())
            return 'ISBN non conforme';
        else if(!this.valideISBn()){
            return 'ISBN non valide';
        } else
            return 'ISBN valide';
    };

    createForm(){
        let form = document.createElement('form');
        let label = document.createElement('label');
        let input = document.createElement('input');
        let br = document.createElement('br');
        let button = document.createElement('button');
        let output = document.createElement('input');

        label.for = 'isbn'+ISBN.id;
        label.appendChild(document.createTextNode('ISBN-13 : '));

        input.id = 'isbn'+ISBN.id;
        input.type = 'text';
        input.pattern = `${ISBN.isbnFormat}`;
        input.required = true;

        button.id = 'validationISBN'+ISBN.id;
        button.type = 'button';
        button.appendChild(document.createTextNode('OK'));

        output.id = 'estValide'+ISBN.id;
        output.type = 'text';
        output.name = 'estValide';
        output.readOnly = true;

        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(br);
        form.appendChild(button);
        form.appendChild(output);
        return form;
    }
}
let isbn = new ISBN();
/*
let form = `
        <form>
            <label for="isbn">ISBN-13 : </label>
            <input id="isbn" type="text"  pattern="${ISBN.isbnFormat}" required><br>
            <button id="validationISBN" type="button">OK</button>
            <input type="text" id="estValide" name="estValide" readonly>
        </form>`;
*/
document.body.appendChild(isbn.createForm());
isbn.isbn = document.getElementById('isbn1').value;

document.getElementById('validationISBN').onclick = function () {
    document.getElementsByName('estValide')[0].value = isbn.test();
    isbn.createForm();
};
