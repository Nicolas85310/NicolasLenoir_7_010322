
const sequelize = require('sequelize')
const db = require('../utils/database')
const Post = require('../models/Post')


const mailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i





 
var User = db.define('User', {
  
  username: {
    type: sequelize.STRING,
    required: true
  },
  email: {
    type: sequelize.STRING,
    required: true,
    unique: true,
    validate: {
      is: mailRegex,
      isEmail: true
    }
  },
  password: {
    type: sequelize.STRING,
    required: true
  },
  avatar: {
    type: sequelize.STRING,
    required: false
  },
  adminStatus: {
    type: sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
 })
 Post.belongsTo(User, {foreignKey: 'userId',     
 onDelete: "CASCADE"})
  


module.exports = User;
