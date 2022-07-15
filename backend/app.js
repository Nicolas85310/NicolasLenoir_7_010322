const express = require('express');
const bodyParser = require('body-parser');

// Permet d'accéder au chemin du système de fichiers
const path = require('path');

// Permet de créer l'application express
const app = express();

// Permet d'importer les routers user, post 
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');


// Transforme le corps de la requête en objet JS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Middleware CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Permet d'accéder aux routes pour les utilisateurs, les publications et les images
app.use('/media', express.static(path.join(__dirname, 'media')));
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);


// Permet d'exporter l'application express pour pouvoir y accéder depuis les autres fichiers du projet 
module.exports = app;

