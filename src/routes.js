const express = require('express');
const multer = require("multer");
const jwt = require('jsonwebtoken');
require("dotenv-safe").config();

const multerConfig = require("./config/Multer");
const productController = require('./controllers/ProductController');
const userController = require('./controllers/UserController');
const imageController = require('./controllers/ImageController');

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
routes.get("/user/:id", userController.selectById);
routes.get("/user", userController.selectAll);

routes.post("/login", userController.login);
routes.post("/user", userController.insert);

/** Rotas Produtos */

routes.get("/prod-All", productController.selectAll);
routes.get("/prod-LimitedNumber/:number", productController.selectLimitedNumber);
routes.get("/prod-LimitedNumberOn/:number", productController.selectLimitedNumberOn);
routes.get("/prod-Id/:cod_produto", productController.selectById);

routes.put("/imagem/:id", multer(multerConfig).single("img_prod"), productController.insertCaminhoImagemProduto);

routes.patch("/prod-Update", productController.update);

routes.post("/prod-Add", productController.insert);

routes.delete("/prod-Del", productController.delete);

/** Rotas Imagem */

routes.post("/insertimagem", multer(multerConfig).single("imagem"), imageController.insert);

module.exports = routes;