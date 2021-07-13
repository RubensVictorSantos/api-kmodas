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

/************************* Rotas User ************************/

/** GET */
routes.get('/logout', userController.logout);
routes.get("/users/:id", userController.selectById);
routes.get("/users", userController.selectAll);

/** POST */
routes.post("/login", userController.login);
routes.post("/users", userController.insert);

/** PUT */

/** DELETE */

/*********************** Rotas Produtos ************************/

/** GET */
routes.get('/products', productController.selectAll);
routes.get('/products/id=:id', productController.selectById);
routes.get('/products/sort=:sort&limit=:limit', productController.selectLimit);
routes.get("/products/status=:status", productController.selectStatus);
routes.get("/products/status=:status/limit=:limit", productController.selectStatusLimit);

/** POST */
routes.post("/products", productController.insert);

/** PUT */
routes.put("/imagem/:id", multer(multerConfig).single("img_prod"), productController.insertCaminhoImagemProduto);

/** DELETE */
routes.delete("/products", productController.delete);

/** PATCH */
routes.patch("/products", productController.update);

/** Rotas Imagem */

// routes.post("/insertimagem", multer(multerConfig).single("imagem"), imageController.insert);

module.exports = routes;