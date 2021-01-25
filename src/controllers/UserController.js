const Produto = require("../models/Produto");
const connection = require("../database");

Produto.init(connection);

module.exports = {
    
}