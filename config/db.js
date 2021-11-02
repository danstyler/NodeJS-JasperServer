const Sequelize = require('sequelize');
require("dotenv").config();


const sequelize = new Sequelize(process.env.DB_CONN_DB, process.env.DB_CONN_USER, process.env.DB_CONN_PW,
  {
    dialect: process.env.DB_CONN_SGBD, host: process.env.DB_CONN_HOST,

    timezone: '-03:00',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: false,
      underscored: true
    }
  });

sequelize.authenticate().then(function () {
  console.log("Base de dados conectada com sucesso!!  :D")
}).catch(function (err) {
  console.log("Erro ao tentar realizar conexão com DB  ;(", err)

});



module.exports = sequelize;