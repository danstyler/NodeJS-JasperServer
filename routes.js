const express = require('express');
const router = express.Router();
const JasperController = require('./controllers/JasperController');
const ItensController = require('./controllers/ItensController');


router.get('/itens', ItensController.index);
router.get('/itens/:id', ItensController.indexOne);
router.get('/printreport/:rel', JasperController.gerar);



module.exports = router;