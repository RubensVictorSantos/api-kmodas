const { Model, DataTypes } = require('sequelize');

class Imagem extends Model{
    static init(sequelize){
        super.init(
            {
                id_imagem: {
                    type:DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                nome: DataTypes.STRING,
                legenda: DataTypes.STRING,
                mimetype: DataTypes.STRING,
                size: DataTypes.INTEGER
            },
            {
                sequelize,
                modelName: "Imagem",
                tableName: "tbl_imagem"
            }
        )
    }
}

module.exports = Imagem;