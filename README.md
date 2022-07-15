# PROJET 7 - Groupomania - Réseau social d'entreprise

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![](mobile.gif)

## INSTALLATION


Pour commencer,veuillez Cloner ce dépot Github avec:
 
```git clone https://github.com/Nicolas85310/NicolasLenoir_7_010322.git```


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
      //  nodemon server.js pour lancer le backend

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
#### 2)soit importer la base de donnée groupomania.sql via mysql (qui se trouve dans le dossier "Import BDD" ) ce qui écrasera l'ancienne (les 3 utilisateurs seront ajoutés):
j'y ai ajouté ```USE 'groupomania'``` comme ça vous n'avez pas besoin de tapez cette commande 😉

Tapez```mysql -u root -h localhost -D groupomania < ....../groupomania.sql``` pour l'import de la bdd.

Pour rappel,dans le dossier Backend il existe déjà un fichier .env avec les variables pour vous connecter à la BDD:
```
DB_HOST = localhost
DB_PORT = 3306
DB_USER = root
DB_PASS = 
DB_NAME = Groupomania
DB_LANG = mysql

```
-------------------------------------------------------------
#### 3)soit executer la requête suivantes,toujours via mysql:

```
INSERT INTO `users` (`id`, `username`, `email`, `password`, `avatar`, `adminStatus`, `createdAt`, `updatedAt`)       VALUES
(1, 'admin', 'admin.admin@sfr.fr', '$2b$10$f08.5aP2jlQHpWM.C33PDuBTaUAUqEddZeMWbCtCNUQ81PDhEYMH2', NULL, 1, '2022-07-15 03:07:22', '2022-07-15 03:07:22'),
(2, 'julien', 'julien.julien@free.fr', '$2b$10$vfHxNfw6YuAjcTI107AByeL3U49aLN9erymebSDiFWlSHVlT1krse', NULL, 0, '2022-07-15 03:11:34', '2022-07-15 03:11:34'),
(3, 'sophie', 'sophie.sophie@orange.fr', '$2b$10$HgLojGJlbG.1qXrBjoei0OcYc6QP.9xbg5SMmTXAAC1Q0Lx2/DRWm', NULL, 0, '2022-07-15 03:12:59', '2022-07-15 03:12:59');
COMMIT;

```

#### En vous souhaitant une bonne exploration ! Merci :)