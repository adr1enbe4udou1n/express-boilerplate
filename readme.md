# Base ExpressJS

Framework Web de base pour des sites Front sans Backend ou prototypes.

## Installation

1. Installation des outils client nécessaires `npm install -g yarn gulp-cli`
2. Lancer la commande `yarn` sur le répertoire du projet
3. Puis démarrer l'application par `gulp serve`
4. Le site prototype doit être accessible sur localhost:3000

L'autoloading est actif sur l'ensemble des fichiers assets et fichiers serveurs (routes et vues).

## Description de la structure

1. `assets` -> Répertoire de base de travail pour l'intégrateur contenant les fichiers Sass et scripts pour la partie cliente
2. `public` -> Répertoire racine de l'application web, c'est le dossier de destination notamment pour la compilation des assets
3. `routes` -> Contient les routes et mini-controllers de l'application expressjs
3. `views` -> Contient les vues EJS, représente le squelette HTML du site
