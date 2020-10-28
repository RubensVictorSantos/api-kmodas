const Produto = require("../models/Produto");
const connection = require("../database");

Produto.init(connection);

module.exports = {
    async selectAll(req, res) {

        console.log("----------------- GET ALL -----------------\n");

        let allProd = await Produto.findAll();

        return res.json(allProd);
    },

    async selectWhereStatusOn(req, res) {

        console.log("----------------- GET BY STATUS -----------------\n");

        let prodStatus = await Produto.findAll({
            where: { status_prod: 1 }
        });

        return res.json(prodStatus);
    },

    async selectById(req, res) {
        const codProd = req.params.cod_prod;

        console.log("----------------- GET BY ID -----------------\n");

        const prod = await Produto.findByPk(codProd);

        return res.json(prod);
    },

    async insert(req, res) {
        const { nome_prod, img_prod, preco_prod, descricao_prod, status_prod } = req.body

        console.log("----------------- INSERT -----------------");

        const newProd = await Produto.create({
            nome_prod,
            img_prod,
            preco_prod,
            descricao_prod,
            status_prod
        });

        return res.json(newProd);
    },

    async update(req, res) {
        const { cod_prod, nome_prod, img_prod, descricao_prod, preco_prod, status_prod } = req.body;

        console.log("----------------- UPDATE -----------------\n");

        const atualizar = await Produto.update({
            nome_prod,
            img_prod,
            descricao_prod,
            preco_prod,
            status_prod,
        }, {
            where: { cod_prod }
        })

        const ProdutoUpdated = await Produto.findByPk(cod_prod);

        return res.json(ProdutoUpdated);
    },

    async delete(req, res) {
        const codProd = req.params.cod_prod;

        console.log("----------------- DELETE -----------------\n");

        const prod = await Produto.findByPk(codProd);

        return res.json(prod);
    }
}