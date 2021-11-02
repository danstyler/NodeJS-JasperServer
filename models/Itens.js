const Sequelize = require('sequelize', 'QueryInterface');
const database = require('../config/db');


let Itens = database.define('Itens', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

},
    {
        freezeTableName: true,
        timestamps: false
    }
);


module.exports = Itens