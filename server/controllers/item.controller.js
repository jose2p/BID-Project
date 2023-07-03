const { itemModel } = require("../models/item.model");

module.exports.createItem = async (request, response) => {
    try {
        const item = await itemModel.create(request.body);
        response.json(item);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}

module.exports.getAllItem = async (request, response) => {
    try {
        const item = await itemModel.find({})
        response.json(item);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}

module.exports.getItem = async (request, response) => {
    try {
      const item = await itemModel.findOne({ _id: request.params.id });
      response.json(item);
    } catch (err) {
      response.json(err);
    }
  }

module.exports.updateItem = async (request, response) => {
    try {
        const item = await itemModel.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true, runValidators: true })
        response.json(item);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}

module.exports.deleteItem = async (request, response) => {
    try {
        const item = await itemModel.deleteOne({ _id: request.params.id })
        response.json(item);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}