let name = prompt('Nom :');
let surname = prompt('Prénom :');
let testDate = new RegExp('^\\d{1,2}\/\\d{1,2}\/\\d{4}$');
let birthdate = prompt('Date de naissance (JJ/MM/AAAA) :');
let birthday;
while(!testDate.test(birthdate)){
    birthdate = prompt('Date de naissance (JJ/MM/AAAA) :');
}
birthdate = birthdate.split('/');
birthdate = new Date(birthdate[2],birthdate[1]-1,birthdate[0]);
switch (birthdate.getDay()) {
    case 0:
        birthday = 'dimanche';
        break;
    case 1:
        birthday = 'lundi';
        break;
    case 2:
        birthday = 'mardi';
        break;
    case 3:
        birthday = 'mercredi';
        break;
    case 4:
        birthday = 'jeudi';
        break;
    case 5:
        birthday = 'vendredi';
        break;
    case 6:
        birthday = 'samedi';
        break;
}
let newWindow = open("","", "width=200,height=200");
newWindow.document.write(surname + ' ' + name + ' est né(e) un ' + birthday);
