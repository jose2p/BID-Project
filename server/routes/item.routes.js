const ItemController = require('../controllers/item.controller');
module.exports = function(app){
    app.post('/api/item', ItemController.createItem);
    app.get('/api/item', ItemController.getAllItem);
    app.get('/api/item/:id', ItemController.getItem);
    app.put('/api/item/:id', ItemController.updateItem);
    app.delete('/api/item/:id', ItemController.deleteItem);
}
