const brcypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const User = require("../models/User");
const connection = require("../database");

User.init(connection);

module.exports = {
    async users(req, res) {
        const users = await User.findAll();
        return res.json(users);
    },

    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const user = await User.findOne({ where: { email } });
            const userStringify = JSON.stringify(user);
            const userJSON = JSON.parse(userStringify);

            if (!userJSON) {
                res.status(404);
                throw new Error("Usuário não encontrado");
            }

            if (!brcypt.compareSync(senha, userJSON.senha)){ 
                res.status(401);
                throw new Error("Usuário e/ou senha inválido(s)");
            }

            const id = userJSON.cod_usuario;

            // auth ok
            const token = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: 300 // expires in 5min
            });

            return res.json({ user: user, auth: true, token: token });

        } catch (error) {

            return res.json({
                error: 'Error',
                message: error.message
            });
        }
    },

    async logout(req, res) {
        return res.status(200).send({ auth: false, token: null })
    },

    /**  */
    async userById(req, res) {
        const { id } = req.params;
        const user = await User.findByPk(id);
        return res.json(user);
    },

    async createUser(req, res) {

        try {
            const { nome, email, senha, cod_nivel } = req.body;

            const emailJaCadastrado = await User.findOne({ where: { email } });

            if (emailJaCadastrado == null) {

                const salt = brcypt.genSaltSync(10);

                const senhaCripto = brcypt.hashSync(senha, salt);

                const usuarioCriado = await User.create({
                    nome, email, senha: senhaCripto, id_nivel: cod_nivel
                });

                return res.json(usuarioCriado);

            } else {
                return res.json({ status: "email já cadastrado" });
            }
        } catch (error) {
            return res.status(400).send({
                message:
                    error.message
            });
        }

    },

    async usersPagination(req, res) {

        try {

            const { offset, limit } = req.params;

            if (isNaN(offset) || isNaN(limit)) throw new Error("Parametro inválido!");

            if ((parseInt(limit) < 0) || (parseInt(offset) < 0)) throw new Error("Parametro 'limit' não pode ser menor que zero!");

            const products = await User.findAndCountAll({
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
}