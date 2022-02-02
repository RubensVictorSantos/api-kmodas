const Product = require("../models/Product");
const connection = require("../database");

Product.init(connection);

module.exports = {
    async products(req, res) {
        const products = await Product.findAll();
        return res.json(products);

    },

    async productById(req, res) {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        return res.json(product);

    },

    async productsLimit(req, res) {
        const limit = parseInt(req.params.limit)
        const sort = req.params.sort

        const products = await Product.findAll({
            order: [[sort, 'DESC']],
            limit: limit
        });
        return res.json(products);
    },

    async productsByStatus(req, res) {
        const status = req.params.status
        const products = await Product.findAll({
            where: { status: status }
        });

        return res.json(products);
    },

    async productsByStatusLimit(req, res) {

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

    async productsPagination(req, res) {

        try {

            const { offset, limit } = req.params;

            console.log([
                {
                    'offset' : offset
                },
                {
                    'limit' : limit
                }]
            );

            // if (isNaN(offset) || isNaN(limit)) throw new Error("Parametro inválido!");

            // if ((parseInt(limit) < 0) || (parseInt(offset) < 0)) throw new Error("Parametro 'limit' não pode ser menor que zero!");

            const products = await Product.findAndCountAll({
                offset: parseInt(offset),
                limit: parseInt(limit)
            })

            return res.json(products);
        } catch (error) {
            return res.status(500).json({
                error: {
                    code: '500',
                    message: error.message
                },
                payload: null
            });
        }
    },

    async createProduct(req, res) {
        const { nome, preco, imagem, descricao, status } = req.body

        const newProducts = await Product.create({
            nome,
            preco,
            imagem,
            descricao,
            status
        });

        return res.json(newProducts);
    },

    async insertCaminhoImagemProduto(req, res) {

        try {
            const produto = await Product.findOne({
                atributes: ['imagem'],
                where: { cod_produto: req.params.id }
            });

            if (!produto) throw new Error('Produto não encontrado, certifique-se de que os parametros estão corretos');

            produto.imagem = req.file.filename;
            produto.save();

            return res.json(produto);

        } catch (error) {
            return res.status(400).send({
                message:
                    error.message
            });
        }
    },

    async updateProduct(req, res, next) {
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

    async deleteProduct(req, res) {
        const id = req.params.id;

        const product = await Product.destroy({
            where: { cod_produto: id }
        });

        return res.json(product);
    },
}