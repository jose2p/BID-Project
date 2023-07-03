const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const { db3 } = require('../config/mongoose.config');

const VentaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lstname: {
        type: String,
        required: true
    },
    lat:  { type: Number },
    lng: { 
        type: Number,
        unique: true
    }
}, { timestamps: true });
VentaSchema.plugin(uniqueValidator);

const ventaModel = db3.model('Venta', VentaSchema);
module.exports = { ventaModel };