<?php
try{
    $bdd = new PDO('mysql:host=localhost;dbname=Bvilles;charset=utf8', 'root', '');
}
catch (Exception $e){
    die('Erreur : ' . $e->getMessage());
}
$reponse = $bdd->prepare('SELECT * FROM villes WHERE nom LIKE :nom');
$reponse->bindValue('nom', $_GET['nom'] . '%');
$reponse->execute();
$tabJson = array();
while ($donnees = $reponse->fetch()){
    array_push($tabJson, array("insee" => $donnees["insee"],
        "nom" => $donnees["nom"],
        "lat" => $donnees["lat"],
        "lg" => $donnees["lg"]));
}
echo(json_encode($tabJson));
$reponse->closeCursor();
