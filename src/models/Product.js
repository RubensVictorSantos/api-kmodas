const { Model, DataTypes } = require("sequelize");

class Product extends Model {
    static init(sequelize) {
        super.init(
            {
                cod_produto: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false
                },
                nome: DataTypes.STRING,
                imagem: DataTypes.STRING,
                preco: DataTypes.DECIMAL,
                descricao: DataTypes.STRING,
                modelo: DataTypes.STRING,
                cor: DataTypes.STRING,
                tamanho: DataTypes.STRING,
                status: {
                    type: DataTypes.CHAR,
                    validate: {
                        isInt: {
                            msg: "Must be an integer number of pennies"
                        },
                        notEmpty: true,
                    }
                }
            },
            {
                sequelize,
                modelName: "Produto",
                tableName: "tbproduto",
            }
        )
    }
}

module.exports = Product;