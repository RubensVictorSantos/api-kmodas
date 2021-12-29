const Product = require("../models/Product");
const connection = require("../database");

Product.init(connection);

module.exports = {
    async getProducts(req, res) {
        let products = await Product.findAll();
        return res.json(products);

    },

    async getProductsLimit(req, res) {
        const limit = parseInt(req.params.limit)
        const sort = req.params.sort

        const products = await Product.findAll({
            order: [[sort, 'DESC']],
            limit: limit
        });
        return res.json(products);
    },

    async getProductsByStatus(req, res) {
        const status = req.params.status
        const products = await Product.findAll({
            where: { status: status }
        });

        return res.json(products);
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

    async getProductsById(req, res) {
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

        // const cod_produto = req.params.id;
        // const imagem = req.file.filename;
        // const produto = await Product.findByPk(cod_produto);
        try {
            const produto = await Product.update({
                imagem: req.file.filename
            }, {
                where: { cod_produto : req.params.id }
            })

            return res.json(produto);

        } catch (error) {

            console.log("Entrou catch");

            return res.status(500).send({
                message:
                    error.message || "Error"
            });
        }
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
        const codProd = req.params.id;

        const prod = await Product.destroy({
            where: { cod_produto: codProd }
        });

        return res.json(prod);
    },

    async selectPagination(req, res) {
        const { offset, limit } = req.params;

        if (isNaN(offset)) {
            return res.status(400)
                .send({
                    message: 'Error.'
                });
        }

        let prodStatus = await Product.findAndCountAll({
            offset: parseInt(offset),
            limit: parseInt(limit)
        }).catch(error => {
            res.status(500).send({
                message:
                    error.message || "Some error occurred while creating the Tutorial."
            });
        });

        return res.json(prodStatus);
    }
}