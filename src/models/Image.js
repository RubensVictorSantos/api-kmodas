const { Model, DataTypes } = require('sequelize');

class Image extends Model{
    static init(sequelize){
        super.init(
            {
                cod_imagem: {
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
                tableName: "tbimagem"
            }
        )
    }
}

module.exports = Image;