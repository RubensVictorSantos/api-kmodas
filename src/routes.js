const express = require('express');
const multer = require("multer");
const multerConfig = require("./config/Multer");
const prodController = require('./controllers/ProdController');
const imagemController = require('./controllers/ImgController');
const routes = express.Router();

/** Rotas Produtos */

routes.get("/prod-All",prodController.selectAll);
routes.get("/prod-LimitedNumber/:number",prodController.selectLimitedNumber);
routes.get("/prod-LimitedNumberOn/:number",prodController.selectLimitedNumberOn);
routes.get("/pord-FirstHundred",prodController.selectFirstHundred);
routes.get("/prod-FirstHundredStatusOn",prodController.selectFirstHundredStatusOn);
routes.get("/prod-Id/:cod_prod",prodController.selectById);

routes.put("/imagem/:id",multer(multerConfig).single("img_prod"),prodController.insertCaminhoImagemProduto);

routes.patch("/prod-Update",prodController.update);

routes.post("/prod-Add",prodController.insert);

routes.delete("/prod-Del",prodController.delete);

/** Rotas Imagem */

routes.post("/insertimagem",multer(multerConfig).single("imagem"),imagemController.insert);

module.exports = routes;