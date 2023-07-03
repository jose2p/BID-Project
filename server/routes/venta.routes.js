const VentaController = require('../controllers/venta.controller');

module.exports = function(app){
    app.post('/api/venta', VentaController.createVenta);
    app.get('/api/venta', VentaController.getAllVenta);
    app.get('/api/venta/:id', VentaController.getVenta);
    app.delete('/api/venta/:id', VentaController.deleteVenta);
}