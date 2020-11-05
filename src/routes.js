const express = require('express');
const multer = require("multer");
const multerConfig = require("./config/Multer");
const prodController = require('./controllers/ProdController');
const imagemController = require('./controllers/ImgController');
const routes = express.Router();

/** Rotas Produtos */

routes.get("/prodAll",prodController.selectAll);
routes.get("/prodLimitedNumber/:number",prodController.selectLimitedNumber);
routes.get("/prodLimitedNumberOn/:number",prodController.selectLimitedNumberOn);
routes.get("/pordFirstHundred",prodController.selectFirstHundred);
routes.get("/prodFirstHundredStatusOn",prodController.selectFirstHundredStatusOn);
routes.get("/prodId/:cod_prod",prodController.selectById);

routes.put("/imagem/:id",multer(multerConfig).single("img_prod"),prodController.insertCaminhoImagemProduto);

routes.patch("/prodUpdate",prodController.update);

routes.post("/prodAdd",prodController.insert);

routes.delete("/prodDel",prodController.delete);

/** Rotas Imagem */

routes.post("/insertimagem",multer(multerConfig).single("imagem"),imagemController.insert);

module.exports = routes;