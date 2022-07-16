# PROJET 7 - Groupomania - Réseau social d'entreprise



<p align="center"><img src="mobile.gif" alt="animated" /></p>
  
## Technologies utilisées:

FRONT: Vue-cli/Bootstrap/Sass-loader......... 

BACK: Express/Sequelize-cli/mysql2........ 

## INSTALLATION

Pré-requis :

- Wampserver installé => téléchargement sur ce lien:

 https://www.wampserver.com/en/download-wampserver-64bits/

- Node.js installé => téléchargement sur ce lien:

 https://nodejs.org/en/download/

- Git installé => téléchargement sur ce lien:

 https://git-scm.com/downloads


Pour commencer,ouvrez un terminal et veuillez Cloner ce dépot Github avec la commande:
 
```git clone https://github.com/Nicolas85310/NicolasLenoir_7_010322.git```


Lancer <p><img src="./readme_images/ws.jpeg" /></p> jusqu'à ce que l'icone en bas devienne vert:

<p><img src="./readme_images/wamp.jpeg" /></p>
  


### Demarrage du Frontend Vue js:

    Pour cela,veuillez ouvrir un nouveau terminal:
    Tapez cd frontend pour aller dans le dossier "frontend"
      //  npm install pour installer les dépendances
      //  npm run serve pour lancer le frontend

      Rendez-vous ensuite à l'adresse http://localhost:8080

### Démarrage du backend:
 
    Pour cela,veuillez ouvrir un nouveau terminal:
    Tapez cd backend pour aller dans le dossier "backend"
      //  npm install pour installer les dépendances
      //  node server.js pour lancer le backend

La base de donnée ainsi que les tables seront crées toutes seules,cependant:

pour la création des 3 utilsateurs c'est à dire (voir ci-dessous), il vous faudra:

#### 1)soit les créer à la main via le site:
```
pseudo:	    email:	              password:
______________________________________________
admin 	    admin.admin@sfr.fr 	      Admin85@   ✋(modifier la clé "adminStatus" sur 1 (table "user"))
 	
julien 	    julien.julien@free.fr     Julien85@

sophie 	    sophie.sophie@orange.fr   Sophie85@

```
-----------------------------------------------
#### 2)soit importer la base de donnée groupomania.sql (qui se trouve dans le dossier "bdd" ) ce qui écrasera l'ancienne (les 3 utilisateurs seront ajoutés):
j'y ai ajouté ```USE 'groupomania'``` comme ça vous n'avez pas besoin de tapez cette commande 😉

 Rendez-vous à cette adresse:

 http://localhost/phpmyadmin/ 

 Cliquer sur <p><img src="./readme_images/exe.jpeg" /></p> pour entrer dans l'interface.d'administration.

 Cliquer sur l'onglet en haut <p><img src="./readme_images/import.jpeg" /></p>.

 Cliquer ensuite sur <p><img src="./readme_images/choisir.jpeg" /></p> et sur la bdd <p><img src="./readme_images/bdd.jpeg" /></p>

 Pour finir,cliquer sur <p><img src="./readme_images/exe.jpeg" /></p>

 Vos utilisateurs on été crées !

-------------------------------------------------------------
#### 3)soit executer la requête suivante,toujours via la page d'administration phpMyadmin:

Cliquer sur l'onglet en haut <p><img src="./readme_images/sql.jpeg" /></p>

Copier le code ci-dessous et le coller dans la zone blanche de texte.

Cliquer sur <p><img src="./readme_images/exe.jpeg" /></p>

Vos utilisateurs on été crées ! 
 
Code:
```
USE `groupomania`;
INSERT INTO `users` (`id`, `username`, `email`, `password`, `avatar`, `adminStatus`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', 'admin.admin@sfr.fr', '$2b$10$f08.5aP2jlQHpWM.C33PDuBTaUAUqEddZeMWbCtCNUQ81PDhEYMH2', NULL, 1, '2022-07-15 03:07:22', '2022-07-15 03:07:22'),
(2, 'julien', 'julien.julien@free.fr', '$2b$10$vfHxNfw6YuAjcTI107AByeL3U49aLN9erymebSDiFWlSHVlT1krse', NULL, 0, '2022-07-15 03:11:34', '2022-07-15 03:11:34'),
(3, 'sophie', 'sophie.sophie@orange.fr', '$2b$10$HgLojGJlbG.1qXrBjoei0OcYc6QP.9xbg5SMmTXAAC1Q0Lx2/DRWm', NULL, 0, '2022-07-15 03:12:59', '2022-07-15 03:12:59');


```

#### En vous souhaitant une bonne exploration ! Merci :)