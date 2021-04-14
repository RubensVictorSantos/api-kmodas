const brcypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const User = require("../models/User");
const connection = require("../database");

User.init(connection);

module.exports = {

    async login(req, res) {
        const { email, senha } = req.body;

        const user = await User.findOne({ where: { email } });

        const userStringify = JSON.stringify(user);

        const userJSON = JSON.parse(userStringify);

        if (userJSON) {
            if (brcypt.compareSync(senha, userJSON.senha)) {

                const id = userJSON.cod_usuario;

                // auth ok
                const token = jwt.sign({ id }, process.env.SECRET, {
                    expiresIn: 300 // expires in 5min
                });

                return res.json({ user: user, auth: true, token: token });

            } else {
                return res.json({ status: "Senhas não correspondem" });

            }
        } else {
            return res.json({ status: "Usuário não existe" });
        }
    },

    async logout(req, res) {
        return res.status(200).send({ auth: false, token: null })
    },

    async selectById(req, res) {
        const id = req.params.id;
        const user = await User.findByPk(id);

        return res.json(user);
    },

    async selectAll(req, res) {

        let allUser = await User.findAll({order: [['nome', 'DESC']]});

        return res.json(allUser);
    },

    async insert(req, res) {
        const { nome, email, senha, cod_nivel } = req.body;

        console.log(req.body);

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

    },
      
}