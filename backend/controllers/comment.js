// Imports

const jwt = require("jsonwebtoken");
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');


// Permet de créer un nouveau commentaire
exports.createComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const userId = decodedToken.userId;

    Post.findOne({
        where: { id: req.params.postId }
    })
        .then(postFound => {
            if (postFound) {
                const com = Comment.build({
                    content: req.body.content,
                    postId: postFound.id,
                    userId: userId
                })
                com.save()
                    .then(() => res.status(201).json({ message: 'Votre commentaire a bien été créé !' }))
                    .catch(error => res.status(400).json({ error: 'Une erreur est survenue 😫 !' }));
            } else {
                return res.status(404).json({ error: 'Message non trouvé' })
            }
        })
        .catch(error => res.status(500).json({ error: 'Une erreur est survenue 😫 !' }));
}


// Permet d'afficher tous les commentaires
exports.getAllComments = (req, res, next) => {
    Comment.findAll({
        order: [['updatedAt', "ASC"], ['createdAt', "ASC"]],
        where: { postId: req.params.postId },
        include: [{
            model: User,
            attributes: ['username', 'avatar']
        }]
    })
        .then(commentFound => {
            if (commentFound) {
                res.status(200).json(commentFound);
                console.log(commentFound);
            } else {
                res.status(404).json({ error: 'Aucun commentaire trouvé' });
            }
        })
        .catch(error => {
            res.status(500).send({ error: 'Une erreur est survenue 😫 !' });
        });
}


// Permet de supprimer un commentaire
exports.deleteComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const userId = decodedToken.userId;

    Comment.findOne({
        attributes: ['userId'],
        where: { id: req.params.commentId }
    })
        .then(async commentFound => {
            if (commentFound) {
                const user = await User.findOne({
                    where: { id: userId },
                })
                console.log(userId);
                console.log(commentFound);
                if (userId == commentFound.userId || user.adminStatus) {
                    Comment.destroy({
                        where: { id: req.params.commentId }
                    })
                        .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
                        .catch(() => res.status(500).json({ error: 'Une erreur est survenue 😫 !' }));
                } else {
                    res.status(403).json({ error: 'Authentification erronée 🏴‍☠️' });
                }

            } 
            else {
                return res.status(404).json({ error: 'Commentaire non trouvé' })
            }
        })
        .catch(error => res.status(500).json({ error: 'Une erreur est survenue 😫 !' }));
}