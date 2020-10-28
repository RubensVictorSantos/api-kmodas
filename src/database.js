const { Sequelize } = require("sequelize");
const con = require("./configdb") 

const sequelize = new Sequelize(con.database, con.user, con.password, {
    host: con.host,
    dialect: "mysql",
    define: {
        underscored: true,
        timestamps: false
    }
});

try {
    
    console.log("\n Database connection success!\n");

} catch (error) {
    console.log("\n Database connection fail: ", error);

}

module.exports = sequelize;