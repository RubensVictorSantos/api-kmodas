const { Sequelize } = require("sequelize");
require("dotenv-safe").config();

const sequelize = new Sequelize( 
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        define: {
            underscored: true,
            timestamps: false
        }
    })

try {
    console.log("\n Database connection success!\n");

} catch (error) {
    console.log("\n Database connection fail: ", error,"\n");

}

module.exports = sequelize;