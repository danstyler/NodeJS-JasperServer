const model = require("../models/Itens")


module.exports = {

    async index(req, res) {

        const Itens = await model.findAll({
            order: [
                ['id']
            ]
        });

        if (Itens  == "" || Itens  == null) {
            return res.status(200).send({ msg: "No have Itens " });
        }

        return res.status(200).send({ Itens  })

    },

    async indexOne(req, res) {

        const Itens = await model.findOne({
            where: {},
            order: [
                ['id']
            ]
        });

        if (Itens  == "" || Itens  == null) {
            return res.status(200).send({ msg: "No have Itens " });
        }

        return res.status(200).send({ Itens  })

    },

    async indexOne(req, res) {

        const { id } = req.params;

        const Itens = await model.findOne({
            where: {
                id: id
            }
        });

        if (Itens == "" || Itens == null) {
            return res.status(200).send({ msg: "!" });
        }

        return res.status(200).send( Itens )

    },

  
}