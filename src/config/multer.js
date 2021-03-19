const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
const dir = "C:\\Users\\Karine\\Desktop\\kmodas"

/** Verificando se existe o diretório apontado, se não existir vai ser criado um*/
if (!fs.existsSync(dir)) { fs.mkdirSync(dir) }

module.exports = {

    /** Storage: Onde armazenar os arquivos */
    storage: multer.diskStorage({

        /**Destination: Difine a pasta na qual o arquivo foi salvo */
        destination: (req, file, cb) => {

            /** Path: Caminho completo para o arquivo enviado */
            cb(null, path.resolve(dir));
        },

        /** Filename: Nome do arquivo dentro do destination */
        filename: (req, file, cb) => {

            /** Criptografando o nome do arquivo (filename) */
            crypto.randomBytes(16, (err, hash) => {
                if (err) {
                    cb(err)
                }

                const fileName = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, fileName);

            })
        }
    }),

    /** Limits: Limites dos dados enviados */
    limits: {
        fileSize: 2 * 1024 * 1024
    },

    /** FileFilter:	Função para controlar quais arquivos são aceitos */
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif"
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);

        } else {
            cb(new Error("Invalid file type."));

        }
    }
}