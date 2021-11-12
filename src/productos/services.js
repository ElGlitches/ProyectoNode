const {
    ObjectId
} = require("mongodb");

const {
    Database
} = require("../database/index");

const {productosUtils}= require('./utils');

const COLLECTION = "productos";

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
};

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return collection.findOne({
        _id: ObjectId(id)
    });
};

const create = async (producto) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(producto);
    return result.insertedId;
};

const generateReport =  async ( name, res) =>{
    let productos = await getAll();
    productosUtils.exelGenerator(productos, name, res)

}

module.exports.ProductsService = {
    getAll,
    getById,
    create,
    generateReport,
};