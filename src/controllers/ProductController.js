const Product = require("../models/Product");
const connection = require("../database");

Product.init(connection);

module.exports = {
    async selectAll(req, res) {

        let allProd = await Product.findAll({order: [['cod_produto', 'DESC']]});

        return res.json(allProd);
    },

    async selectLimitedNumber(req, res) {

        const num = parseInt(req.params.number)

        let query = await Product.findAll({
            order: [['cod_produto', 'DESC']],
            limit: num
        });

        return res.json(query);
    },

    async selectLimitedNumberOn(req, res) {

        const num = parseInt(req.params.number)

        let prodStatus = await Product.findAll({
            where: { status: 1 },
            order: [['cod_produto', 'DESC']],
            limit: num
        });

        return res.json(prodStatus);
    },

    async selectAllStatusOn(req, res) {

        let prodStatus = await Product.findAll({
            where: { status: 1 }
        });

        return res.json(prodStatus);
    },

    async selectById(req, res) {
        const id = req.params.cod_produto;

        const prod = await Product.findByPk(id);

        return res.json(prod);
    },

    async insert(req, res) {
        const { nome, preco, imagem, descricao, status} = req.body

        const newProd = await Product.create({
            nome,
            preco,
            imagem,
            descricao,
            status
        });

        return res.json(newProd);
    },

    async insertCaminhoImagemProduto(req, res) {

        const cod_prod = req.params.id;
        const produto = await Product.findByPk(cod_prod);

        await Product.update({
            img_prod: req.file.filename
        },{
            where: {cod_prod}
        });

        return res.json(produto);
    },

    async update(req, res) {
        const { cod_produto, nome, imagem, descricao, preco, status } = req.body;

        const atualizar = await Product.update({
            nome,
            imagem,
            descricao,
            preco,
            status,
        }, {
            where: { cod_produto: cod_produto }
        })

        const ProdutoUpdated = await Product.findByPk(cod_produto);

        return res.json(ProdutoUpdated);
    },

    async delete(req, res) {
        const codProd = req.params.cod_prod;

        const prod = await Product.findByPk(codProd);

        return res.json(prod);
    }
}