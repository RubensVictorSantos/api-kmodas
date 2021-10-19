const Product = require("../models/Product");
const connection = require("../database");

Product.init(connection);

module.exports = {
    async selectAll(req, res) {

        let product = await Product.findAll({
            order: [['cod_produto', 'DESC']]
        });

        return res.json(product);
    },

    async selectLimit(req, res) {

        const limit = parseInt(req.params.limit)
        const sort = req.params.sort

        const query = await Product.findAll({
            order: [[sort, 'DESC']],
            limit: limit
        });

        return res.json(query);
    },

    async selectStatus(req, res) {

        console.log('Entrou\n');

        const status = parseInt(req.params.status)

        if (isNaN(status)) {
            return res.status(400)
                .send({
                    message: 'Error.'
                });
        }

        let prodStatus = await Product.findAll({
            where: { status: status }
        });

        return res.json(prodStatus);
    },

    async selectStatusLimit(req, res) {

        const status = parseInt(req.params.status);
        const limit = parseInt(req.params.limit);

        if (isNaN(status)) {
            return res.status(400)
                .send({
                    message: 'Error.'
                });
        }

        let prodStatus = await Product.findAll({
            where: { status: status },
            limit: limit

        });

        return res.json(prodStatus);
    },

    async selectById(req, res) {

        const id = req.params.id;

        const product = await Product.findByPk(id);

        return res.json(product);
    },

    async insert(req, res) {
        const { nome, preco, imagem, descricao, status } = req.body

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

        const cod_produto = req.params.id;
        const produto = await Product.findByPk(cod_produto);

        await Product.update({
            imagem: req.file.filename
        }, {
            where: { cod_produto }
        })

        return res.json(produto);
    },

    async update(req, res, next) {
        const { cod_produto, nome, imagem, descricao, preco, status } = req.body;

        await Product.update({
            nome,
            imagem,
            descricao,
            preco,
            status,

        }, {
            where: { 
                cod_produto: cod_produto 
            }

        });

        const produto = await Product.findByPk(cod_produto);
        return res.json(produto);

    },

    async delete(req, res) {
        const codProd = req.params.cod_prod;

        const prod = await Product.findByPk(codProd);

        return res.json(prod);
    }
}