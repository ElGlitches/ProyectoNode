const createError = require("http-errors");
const debug = require("debug")("app:module-producto-controller");

const {
    ProductsService
} = require("./services");

const {
    Response
} = require("../common/response");

module.exports.ProductsController = {
    getProducts: async (req, res) => {
        try {
            let productos = await ProductsService.getAll();
            Response.success(res, 200, "Lista de productos", productos);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    getProduct: async (req, res) => {
        try {
            const {
                params: {
                    id
                },
            } = req;
            let producto = await ProductsService.getById(id);
            if (!producto) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, `Producto ${id}`, producto);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    createProduct: async (req, res) => {
        try {
            const {
                body
            } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest());
            } else {
                const insertedId = await ProductsService.create(body);
                Response.success(res, 201, "Producto agregado", insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    generareReport: (req,res) => {
        try {
            ProductsService.generateReport('Inventario', res );
        } catch (error) {
            debug(error);
            Response.error(res);
        }
            
    }
    
};