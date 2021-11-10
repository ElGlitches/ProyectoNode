const express = require("express");
const debug = require("debug")("app:main");

const {
    Config
} = require("./src/config/index");
const {
    ProductsAPI
} = require("./src/productos/index");

const app = express();

app.use(express.json());

//modulos
ProductsAPI(app);

app.listen(Config.port, () => {
    debug(`Servidor escuchando en el puerto ${Config.port}`);
});