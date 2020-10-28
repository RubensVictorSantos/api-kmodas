const { Model, DataTypes } = require("sequelize");

class Produto extends Model{
    static init(sequelize){
        super.init(
            {
                cod_prod:{
                    type:DataTypes.INTEGER,
                    primaryKey:true,
                    autoIncrement:true
                },
                nome_prod:DataTypes.STRING,
                img_prod:DataTypes.STRING,
                preco_prod:DataTypes.DECIMAL,
                descricao_prod:DataTypes.STRING,
                status_prod:DataTypes.CHAR,
            },
            {
                sequelize,
                modelName:"Produto",
                tableName:"tbl_produto",
            }
        )
    }
}

module.exports = Produto;