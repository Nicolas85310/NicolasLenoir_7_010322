const sequelize = require('sequelize')
const db = require('../utils/database')
const User = require('../models/User')
const Post = require('../models/Post')

var Comment = db.define('Comment', {
  
  content: {
    type: sequelize.STRING,
    required: true
  },
  postId: {
    type: sequelize.INTEGER,
    required: true,
    
  },
  userId: {
    type: sequelize.INTEGER,
    required: true,
    
  }
   
});


  Comment.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: "CASCADE"
  }),
  Comment.belongsTo(Post, {
    foreignKey: 'postId',
    onDelete: "CASCADE",
    hooks: true,
  })
  
  
  
  


module.exports = Comment;