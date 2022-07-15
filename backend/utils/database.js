
const mysql = require("mysql2/promise");
const sequelize = require("sequelize");

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
};

const pool = mysql.createPool(config);


(async () => {
  try {
    connection = await pool.getConnection();
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log('Création de la Base de donnée OK ');
    await database.sync({alter: true});
    console.log('Toutes les TABLES ont été créées :) ');
    
  } catch (error) {
    console.error('Impossible de se connecter,erreur suivante:', error);
  }
})();

const database = new sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",

    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  }
);

module.exports = database;
