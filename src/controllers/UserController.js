const brcypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const Usuario = require("../models/User");
const connection = require("../database");

Usuario.init(connection);

module.exports = {

    async login(req, res) {
        const { email, senha } = req.body;

        console.log(
            "\n|************************************************************" +
            "\n|Email: " + email +
            "\n|Senha: " + senha +
            "\n|************************************************************\n"
        )

        const usuario = await Usuario.findOne({ where: { email } });

        const usuarioStringify = JSON.stringify(usuario);

        const usuarioJSON = JSON.parse(usuarioStringify);

        console.log("\n Usuario: " + usuarioStringify)

        if (usuarioJSON) {
            if (brcypt.compareSync(senha, usuarioJSON.senha)) {

                const id = usuarioJSON.id_usuario;

                // auth ok
                const token = jwt.sign({ id }, process.env.SECRET, {
                    expiresIn: 300 // expires in 5min
                });

                return res.json({ usuario: usuario, auth: true, token: token });

            } else {
                return res.json({ status: "Senhas não correspondem" });

            }
        } else {
            return res.json({ status: "Usuário não existe" });
        }
    },

    async logout(req, res) {

        console.log("----------------- LOGOUT -----------------\n");
        return res.status(200).send({ auth: false, token: null })
    },

    async selectById(req, res) {
        const id = req.params.id;
        const usuario = await Usuario.findByPk(id);

        return res.json(usuario);
    },

    async selectAll(req, res) {

        let allUser = await Usuario.findAll({order: [['nome', 'DESC']]});

        return res.json(allUser);
    },

    async insert(req, res) {
        const { nome, email, senha, id_nivel } = req.body;

        console.log(typeof (req.body.nome));

        const emailJaCadastrado = await Usuario.findOne({ where: { email } });

        console.log(emailJaCadastrado)

        if (emailJaCadastrado == null) {

            const salt = brcypt.genSaltSync(10);

            const senhaCripto = brcypt.hashSync(senha, salt);

            const usuarioCriado = await Usuario.create({
                nome, email, senha: senhaCripto, id_nivel
            });

            return res.json(usuarioCriado);

        } else {
            return res.json({ status: "email já cadastrado" });
        }



    },
      
}