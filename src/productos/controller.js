const debug = require("debug")("app:module-producto-controller");

const {
    ProductsService
} = require("./services");

module.exports.ProductsController = {
    getProducts: async (req, res) => {
        try {
            let productos = await ProductsService.getAll();
            res.json(productos);
        } catch (error) {
            debug(error);
            res.status(500).json({
                message: "insternal Server Error",
            });
        }
    },

    getProduct: async (req, res) => {
        try {
            const {
                params: {
                    id
                }
            } = req;
            let producto = await ProductsService.getById(id);
            res.json(producto);
        } catch (error) {
            debug(error);
            res.status(500).json({
                message: "insternal Server Error",
            });
        }
    },

    createProduct: async (req, res) => {
        try {
            const {
                body
            } = req;
            const insertedId = await ProductsService.create(body);
            res.json(insertedId);
        } catch (error) {
            debug(error);
            res.status(500).json({
                message: "insternal Server Error",
            });
        }
    },
};