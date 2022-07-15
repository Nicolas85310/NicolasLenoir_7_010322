// Imports
const jwt = require("jsonwebtoken");

const User = require('../models/User');
const Post = require('../models/Post');
const fs = require('fs');

require('dotenv').config({path: './config/.env'});

// Permet de créer un nouveau message
exports.createPost =  (req, res, next) => {   
    const content = req.body.content;
    
    const token = req.headers.authorization.split(' ')[1];
    
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    
    const userId = decodedToken.userId;
    //var decoded = jwt.decode(token, {complete: true});
    

   
    
    
    // Permet de vérifier que tous les champs sont complétés
    if (content == null || content == '') {
        return res.status(400).json({ error: 'Tous les champs doivent être renseignés' });
    } 

    // Permet de contrôler la longueur du titre et du contenu du message
    if (content.length <= 4) {
        return res.status(400).json({ error: 'Le message doit avoir un minimum de 4 caractères' });
    }
    
    User.findOne({
       where: { id: userId }  
    })
     
    .then(userFound => {
        if(userFound) {
            const post = Post.build({
                content: req.body.content,
                imagePost: req.file ? `${req.protocol}://${req.get('host')}/media/postMedia/${req.file.filename}`: req.body.imagePost,
                userId: userFound.id
            })
            post.save()
            //console.log(error)
            .then(() => res.status(201).json({ message: 'Votre message a bien été créé !' }))
            .catch(error => {console.log(error);res.status(400).json({ error: 'Une erreur est survenue 😫 !' })});
        } else {
            return res.status(404).json({ error: 'Utilisateur non trouvé' })
        }
    })
    .catch(error => {console.log(error);res.status(500).json({ error: 'Une erreur est survenue 😫 !' })}); 
    
};


// Permet d'afficher tous les messages
exports.getAllPosts = (req, res, next) => {
    Post.findAll({
        order: [['createdAt', "DESC"]] ,
        include: [{
            model: User,
            attributes: [ 'username', 'avatar' ]
        },]
    })
    .then(postFound => {
        if(postFound) {
            res.status(200).json(postFound);
        } else {
            res.status(404).json({ error: 'Aucun message trouvé' });
        }
    })
    .catch(error => {
        res.status(500).send({ error: 'Une erreur est survenue 😫 !' });
        console.log(error);
    });
}


// Permet de modifier un message
exports.modifyPost = (req, res, next) => {
    console.log('file', req.file);
    console.log('content', req.body.content);
    console.log('bodypost', req.body.post);
    const postObject = req.file ?
    {
    content: req.body.content,
    imagePost: `${req.protocol}://${req.get('host')}/media/postMedia/${req.file.filename}`
    } : { ...req.body };

    console.log('body', req.body);
    console.log(req.params.postId);

    Post.findOne({
        where: {  id: req.params.postId },
    })
    .then(postFound => {
        if(postFound) {
            Post.update(postObject, {
                where: { id: req.params.postId}
            })
            .then(post => res.status(200).json({ message: 'Message modifié !' }))
            .catch(error => res.status(400).json({ error: 'Une erreur est survenue 😫 !' }))
        }
        else {
            res.status(404).json({ error: 'Message non trouvé' });
        }
    })
    .catch(error => res.status(500).json({ error: 'Une erreur est survenue 😫 !' }));
}


// Permet de supprimer un message
exports.deletePost = (req, res, next) => {
    Post.findOne({
        attributes: ['id'],
        where: { id: req.params.postId }
    })
    .then(post => {
        if(post) {
            if(post.imagePost != null) {
                const filename = post.imagePost.split('/media/post/')[1];
            
                fs.unlink(`media/post/${filename}`, () => {
                    Post.destroy({ 
                        where: { id: req.params.postId } 
                    })
                    .then(() => res.status(200).json({ message: 'Message supprimé !' }))
                    .catch(() => res.status(500).json({ error: 'Une erreur est survenue 😫 !' }));
                })
            } else {
                Post.destroy({ 
                    where: { id: req.params.postId } 
                })
                .then(() => res.status(200).json({ message: 'Message supprimé !' }))
                .catch(() => res.status(500).json({ error: 'Une erreur est survenue 😫 !' }));
            }
        } else {
            return res.status(404).json({ error: 'Message non trouvé'})
        }
    })
    .catch(error => res.status(500).json({ error: 'Une erreur est survenue 😫 !' }));
}

