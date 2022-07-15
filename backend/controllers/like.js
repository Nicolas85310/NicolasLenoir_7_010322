// Imports
const jwt = require("jsonwebtoken");
const Post = require('../models/Post');
const Like = require('../models/Like');
const User = require('../models/User');



// Permet d'aimer un message
exports.likePost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const userId = decodedToken.userId;
    const isliked = req.body.like
    

    Post.findOne({
      
        where: { id: req.params.postId },
    })

    .then(postfound => {
        if(!postfound) {
            return res.status(404).json({ error: 'Le message n\'a pas été trouvé' })
        } else if (isliked == false) {
            Like.create({ 
                postId: req.params.postId, 
                userId: userId 
            })
            .then(response => {
                console.log(postfound.likes);
                
                Post.update({ 
                    likes: postfound.likes +1
                },{
                    where: { id: req.params.postId }
                })
                .then(() => res.status(201).json({ message: 'Et un like de plus ! !' }))
                .catch(error => res.status(500).json({ error: 'Une erreur est survenue 😫 !' })) 
            })
            .catch(error => res.status(400).json({ error: 'Une erreur est survenue 😫 !' }))
        } else if(isliked == true) {
            Like.destroy({ 
                where: { 
                    postId: req.params.postId, 
                    userId: userId 
                } 
            })
            .then(() => {
                Post.update({ 
                    likes: postfound.likes -1
                },{
                    where: { id: req.params.postId }
                })
                .then(() => res.status(201).json({ message: 'Vous n\'aimez plus ce message' }))
                .catch(error => res.status(500).json({ error: 'Une erreur est survenue 😫 !' })) 
            })
            .catch(error => res.status(400).json({ error: 'Une erreur est survenue 😫 !' }))
        } else {
            console.log('ko');
        }
    })
    .catch(error => res.status(400).json({ error: 'Une erreur est survenue 😫 !' }))  
}

// Permet d'afficher tous les likes pour un message
exports.getAllLike = (req, res, next) => {
    Like.findAll({
        where: { postId: req.params.postId},
        include: {
            model: User,
            attributes: ["username"]
        },
    })
    .then(likePostFound => {
        if(likePostFound) {
            res.status(200).json(likePostFound);
            console.log(likePostFound);
        } else {
            res.status(404).json({ error: 'Aucun like trouvé' });
        }
    })
    
    .catch(error => res.status(500).json({ error: 'Une erreur est survenue 😫 !' })) 
     
}
