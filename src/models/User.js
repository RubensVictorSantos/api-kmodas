const {Model,DataTypes} = require("sequelize");

class User extends Model{
    static init(sequelize){
        super.init({
            cod_usuario:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true,
                allowNull: false
            },
            nome : DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            cod_nivel: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName:"Usuario",
            tableName:"tbusuario"
        })
    }
}

module.exports = User;