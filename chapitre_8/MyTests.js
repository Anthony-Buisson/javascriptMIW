
/*
QUnit.test("fonction surface", function (assert) {
    assert.equal(surface({'forme': 'Carré', 'cote': 10}), 100, 'Carré de côté 10: valide (100)');
    assert.equal(surface({'forme': 'Rectangle', 'largeur': 50, 'longueur': 100}), 5000, 'Rectangle de largeur 50 et longueur 100: valide (5000)');
    assert.equal(surface({'forme': 'Rectangle', 'largeur': "50", 'longueur': "100"}), 5000, 'Rectangle de largeur 50 et longueur 100: valide (5000)');

    assert.equal(surface({'forme': 'Carré', 'coe': 10}), -1, 'Structure invalide');
    assert.equal(surface({'forme': 'Rectangle', 'largeur': 50}), -1, 'Structure invalide');
    assert.equal(surface({'form': 'Rectangle', 'largeur': 50}), -1, 'Structure invalide');
    assert.equal(surface({'forme': 'Carré', 'cote': {'cote': 1}}), -1, 'Valeur invalide');
    assert.equal(surface({'forme': 'Rectangle', 'largeur': 'oui', 'longueur': 'non'}), -1, 'Valeur invalide');
    assert.equal(surface({'forme': 'Rectangle', 'largeur': -10, 'longueur': -20}), -1, 'Valeur invalide');
    assert.equal(surface({'forme': 'Rectangle', 'largeur': -10, 'longueur': 20}), -1, 'Valeur invalide');
    assert.equal(surface({'forme': 'Car', 'cote': 10}), -1, 'Forme invalide');
    assert.equal(surface(function () {console.log('test')}), -1, 'Paramètre invalide');
    assert.equal(surface(100), -1, 'Paramètre invalide');
});
*/



MiwUnit.test("fonction surface", function () {
    MiwUnit.assert(surface({'forme': 'Carré', 'cote': 10}) ===  100, 'Carré de côté 10: valide (100)');
    MiwUnit.assert(surface({'forme': 'Rectangle', 'largeur': 50, 'longueur': 100}) === 5000, 'Rectangle de largeur 50 et longueur 100: valide (5000)');
    MiwUnit.assert(surface({'forme': 'Rectangle', 'largeur': "50", 'longueur': "100"}) === 5000, 'Rectangle de largeur 50 et longueur 100: valide (5000)');

    MiwUnit.assert(surface({'forme': 'Carré', 'coe': 10}) === -1, 'Structure invalide');
    MiwUnit.assert(surface({'forme': 'Rectangle', 'largeur': 50}) === -1, 'Structure invalide');
    MiwUnit.assert(surface({'form': 'Rectangle', 'largeur': 50}) === -1, 'Structure invalide');
    MiwUnit.assert(surface({'forme': 'Carré', 'cote': {'cote': 1}}) === -1, 'Valeur invalide');
    MiwUnit.assert(surface({'forme': 'Rectangle', 'largeur': 'oui', 'longueur': 'non'}) === -1, 'Valeur invalide');
    MiwUnit.assert(surface({'forme': 'Rectangle', 'largeur': -10, 'longueur': -20}) === -1, 'Valeur invalide');
    MiwUnit.assert(surface({'forme': 'Rectangle', 'largeur': -10, 'longueur': 20}) === -1, 'Valeur invalide');
    MiwUnit.assert(surface({'forme': 'Car', 'cote': 10}) === -1, 'Forme invalide');
    MiwUnit.assert(surface(function () {console.log('test')}) === -1, 'Paramètre invalide');
    MiwUnit.assert(surface(100) === -1, 'Paramètre invalide');
});

MiwUnit.test("fonction surface", function () {
    MiwUnit.assert(surface({'forme': 'Carré', 'cote': 10}) ===  100, 'Carré de côté 10: valide (100)');
    MiwUnit.assert(surface({'forme': 'Rectangle', 'largeur': 50, 'longueur': 100}) === 5000, 'Rectangle de largeur 50 et longueur 100: valide (5000)');
    MiwUnit.assert(surface({'forme': 'Rectangle', 'largeur': "50", 'longueur': "100"}) === 5000, 'Rectangle de largeur 50 et longueur 100: valide (5000)');

    MiwUnit.assert(surface({'forme': 'Carré', 'coe': 10}) === -1, 'Structure invalide');
    MiwUnit.assert(surface({'forme': 'Rectangle', 'largeur': 50}) === -10, 'Structure invalide');
    MiwUnit.assert(surface(100) === -1, 'Paramètre invalide');
});
