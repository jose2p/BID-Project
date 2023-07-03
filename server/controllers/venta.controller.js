const { ventaModel } = require('../models/venta.model');

module.exports.createVenta = (request, response) => {
    const { name, lstname, lat, lng} = request.body;
    ventaModel.create({
        name,
        lstname,
        lat,
        lng
    })
        .then(venta => response.json(venta))
        .catch(err => {
            response.status(400)
            response.json(err)
        });
}
module.exports.getAllVenta = (request, response) => {
    ventaModel.find({})
        .then(venta => response.json(venta))
        .catch(err => response.json(err))
}
module.exports.getVenta = (request, response) => {
    ventaModel.findOne({_id:request.params.id})
        .then(venta => response.json(venta))
        .catch(err => response.json(err))
}

module.exports.deleteVenta = async (request, response) => {
    try {
        const venta = await ventaModel.deleteOne({ _id: request.params.id })
        response.json(venta);
    } catch (err) {
        response.status(400);
        response.json(err);
    }
}