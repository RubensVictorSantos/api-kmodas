const Produto = require("../models/Produto");
const connection = require("../database");

Produto.init(connection);

module.exports = {
    async selectAll(req, res) {

        console.log("----------------- GET ALL -----------------\n");

        let allProd = await Produto.findAll({order: [['cod_prod', 'DESC']]});

        return res.json(allProd);
    },

    async selectLimitedNumber(req, res) {

        console.log("\n----------------- GET BY LIMITED NUMBER -----------------");

        const num = parseInt(req.params.number)

        let query = await Produto.findAll({
            order: [['cod_prod', 'DESC']],
            limit: num
        });

        return res.json(query);
    },

    async selectLimitedNumberOn(req, res) {

        console.log("\n----------------- GET BY LIMITED NUMBER WITH STATUS ON -----------------");

        const num = parseInt(req.params.number)

        let prodStatus = await Produto.findAll({
            where: { status_prod: 1 },
            order: [['cod_prod', 'DESC']],
            limit: num
        });

        return res.json(prodStatus);
    },

    async selectAllStatusOn(req, res) {

        console.log("----------------- GET BY STATUS -----------------\n");

        let prodStatus = await Produto.findAll({
            where: { status_prod: 1 }
        });

        return res.json(prodStatus);
    },

    async selectById(req, res) {
        const codProd = req.params.cod_prod;

        console.log("\n----------------- GET BY ID -----------------");

        const prod = await Produto.findByPk(codProd);

        return res.json(prod);
    },

    async insert(req, res) {
        const { nome_prod, preco_prod, img_prod, descricao_prod, status_prod } = req.body

        console.log("----------------- INSERT PRODUTO -----------------");

        const newProd = await Produto.create({
            nome_prod,
            preco_prod,
            img_prod,
            descricao_prod,
            status_prod
        });

        return res.json(newProd);
    },

    async insertCaminhoImagemProduto(req, res) {

        const cod_prod = req.params.id;
        const produto = await Produto.findByPk(cod_prod);

        console.log("----------------- INSERT IMAGEM PRODUTO -----------------\n");

        await Produto.update({
            img_prod: req.file.filename
        },{
            where: {cod_prod}
        });

        return res.json(produto);
    },

    async update(req, res) {
        const { cod_prod, nome_prod, img_prod, descricao_prod, preco_prod, status_prod } = req.body;

        console.log("----------------- UPDATE PRODUTO -----------------\n");

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

        console.log("----------------- DELETE PRODUTO -----------------\n");

        const prod = await Produto.findByPk(codProd);

        return res.json(prod);
    }
}