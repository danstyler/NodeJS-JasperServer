const express = require('express');
const routes = require('./routes');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./config/db');
var cors = require('cors');


const corsOptions = {
    origin: '*',
    credentials: true,
}

app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.json());
app.use(routes);


// Quando não encontrar uma rota
app.use((req, res, next) =>{
    const erro = new Error("404");
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            msg: error.message
        }
    })
});

module.exports = app;