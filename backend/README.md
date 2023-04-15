# Initialisation de espace de travail (backend)

npm init

# Installation "express" et "mongoose"

npm install express mongoose

# Lancer mogodb 
docker run --name mongodb -p 27017:27017 -v /data:/data/db -d mongo



Lorsque vous installez les packages express et mongoose en utilisant la commande npm install, vous installez deux dépendances importantes pour créer un serveur web RESTful avec une base de données NoSQL MongoDB :

express est un framework web pour Node.js qui facilite la création d'applications web avec Node.js. Il permet notamment de créer facilement des routes pour votre API RESTful.

mongoose est une bibliothèque qui permet de modéliser des données pour MongoDB et de les utiliser dans des applications Node.js. Elle facilite notamment l'interaction avec la base de données MongoDB en fournissant une API simple et expressive pour la manipulation de données.

Lorsque vous installez mongoose avec npm, cela ne signifie pas que vous installez automatiquement MongoDB. Vous devez installer MongoDB séparément sur votre système pour pouvoir l'utiliser avec mongoose. Cela peut être fait en téléchargeant et en installant MongoDB à partir de leur site officiel.

En résumé, si vous voulez utiliser mongoose pour interagir avec une base de données MongoDB, vous devez installer MongoDB séparément sur votre système.

# Voici les étapes à suivre pour installer MongoDB sur Docker :

Installez Docker sur votre machine, si ce n'est pas déjà fait.

## Dans votre terminal, tapez la commande suivante pour télécharger l'image MongoDB :

docker pull mongo

## Créez un conteneur en utilisant l'image téléchargée, avec la commande suivante :

docker run --name mongodb -p 27017:27017 -v /data:/data/db -d mongo

spécifie le nom du conteneur que vous voulez créer (dans cet exemple, nous l'avons appelé "mongodb")
-p associe le port du conteneur MongoDB (27017) au port de votre machine hôte (également 27017)
-v spécifie un volume partagé entre votre machine hôte et le conteneur MongoDB,

dans cet exemple, nous avons utilisé "/data" comme dossier partagé
-d spécifie que le conteneur doit être exécuté en arrière-plan

Vous pouvez ensuite utiliser un client MongoDB pour vous connecter à votre conteneur MongoDB,
ou utiliser l'API de votre application Node.js pour interagir avec votre base de données MongoDB.
