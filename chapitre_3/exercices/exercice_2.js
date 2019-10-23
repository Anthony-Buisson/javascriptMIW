document.getElementById('exercice2')
.innerHTML = '<form>' +
    '<label for="name">Nom</label><input name="name" type="text" required><br>' +
    '<label for="surname">Prénom</label><input name="surname" type="text" required><br>' +
    '<label for="road">Rue</label><input name="road" type="text"><br>' +
    '<label for="zipcode">Code postal</label><input name="zipcode" type="number" required><br>' +
    '<label for="city">Ville</label><input name="city" type="text" required><br>' +
    '<label for="mail">E-mail</label><input name="mail" type="email" pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$/" required><br>' +
    '<label for="phone">Téléphone</label><input name="phone" type="tel" required><br>' +
    '<button type="submit">Valider</button>' +
    '</form>';
