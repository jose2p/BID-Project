const mongoose = require('mongoose');
const {db1} = require('../config/mongoose.config');

const ItemSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: [3, 'The minimun is 3'],
        
    },
    brand: {
        type: String,
        minlength: [3, 'The minimun is 3'],
        
    },
    imgurl: {

    },
    description: {
        type: String,
        minlength: [10, 'The minimun is 10'],
        
    },
    category: {
        type: String,        
    },
    price: {
        type: Number,        
    },

}, { timestamps: true });

const itemModel = db1.model('Item', ItemSchema);
module.exports = { itemModel }



