const sequelize = require('sequelize')
const db = require('../utils/database')
const User = require('../models/User')
const Post = require('../models/Post')


const Like = db.define('Like', {
  
  postId: {
    type: sequelize.INTEGER,
    model: 'Post',
    key: 'id'
    
  },
  userId: {
    type: sequelize.INTEGER,
    model: 'User',
    key: 'id'
    
  }
   
})
  Like.belongsTo(User, { 
    foreignKey: 'userId' 
  });
  Like.belongsTo(Post, {
    foreignKey: 'postId'
  })

  
  
  
  

module.exports = Like;