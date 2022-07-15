
const sequelize = require('sequelize')
const db = require('../utils/database')






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



module.exports = Post;