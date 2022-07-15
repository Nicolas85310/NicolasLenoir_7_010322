
const sequelize = require('sequelize')
const db = require('../utils/database')
const User = require('../models/User')





var Post =  db.define('Post', {

  content: {
    type: sequelize.STRING,
    required: true
  },

  imagePost: {
    type: sequelize.STRING,
    required: false
  },

  likes: {
    type: sequelize.INTEGER,
    required: false
  },

  userId: {
    type: sequelize.INTEGER,
    required: true,
    
  }

})

 //User.hasMany(Post, {as: 'Post', foreignKey: 'userId'});
    
//Post.belongsTo(User, {foreignKey: 'userId'})







module.exports = Post;