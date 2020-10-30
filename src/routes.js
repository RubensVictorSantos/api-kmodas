const express = require('express');
const routes = express.Router();
const multer = require("multer");
const multerConfig = require("./config/Multer");
const prodController = require('./controllers/ProdController');

/** Rotas Produtos */

routes.get("/allProd",prodController.selectAll);
routes.get("/pordFirstHundred",prodController.selectFirstHundred);
routes.get("/prodStatusOn",prodController.selectWhereStatusOn);
routes.get("/prodFirstHundredStatusOn",prodController.selectFirstHundredStatusOn);
routes.get("/prodId/:cod_prod",prodController.selectById);

routes.put("/imagem/:id",multer(multerConfig).single("img_prod"),prodController.insertCaminhoImagemProduto);

routes.patch("/updateProd",prodController.update);

routes.post("/addProd",prodController.insert);

routes.delete("/delProd",prodController.delete);

module.exports = routes;