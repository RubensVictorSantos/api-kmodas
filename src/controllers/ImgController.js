const Imagem = require('../models/Imagem');
const connection = require('../database');

Imagem.init(connection);

module.exports = {
    async insert(req, res) {

        console.log(res);

        const nome = JSON.stringify(req.file.filename);
        // const legenda = res.body.legenda
        const mimetype = req.file.mimetype
        const size = req.file.size

        console.log("----------------- INSERT IMAGEM -----------------");

        await Imagem.create({
            nome,
            // legenda,
            mimetype,
            size
        });

        console.log(res);

        return console.log("\n -----\n " + req + res.json(req.file));
    }
}