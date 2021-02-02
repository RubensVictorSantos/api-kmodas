const express = require('express');
const multer = require("multer");
const multerConfig = require("./config/Multer");
const prodController = require('./controllers/ProdController');
const userController = require('./controllers/UserController');
const imagemController = require('./controllers/ImgController');

const jwt = require('jsonwebtoken');
require("dotenv-safe").config();
require("dotenv").config()

const routes = express.Router();

function verifyJWT(req, res, next) {
    let token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        // Se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
    });
}

/** Rotas User */

routes.get('/logout', userController.logout);
routes.get("/user-Id", userController.selectById);

routes.post("/login", userController.login);
routes.post("/user-Add", userController.insert);

/** Rotas Produtos */

routes.get("/prod-All", prodController.selectAll);
routes.get("/prod-LimitedNumber/:number", prodController.selectLimitedNumber);
routes.get("/prod-LimitedNumberOn/:number", prodController.selectLimitedNumberOn);
routes.get("/prod-Id/:cod_prod", prodController.selectById);

routes.put("/imagem/:id", multer(multerConfig).single("img_prod"), prodController.insertCaminhoImagemProduto);

routes.patch("/prod-Update", prodController.update);

routes.post("/prod-Add", prodController.insert);

routes.delete("/prod-Del", prodController.delete);

/** Rotas Imagem */

routes.post("/insertimagem", multer(multerConfig).single("imagem"), imagemController.insert);

module.exports = routes;