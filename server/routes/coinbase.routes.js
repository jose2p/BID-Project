const coinbaseController = require("../controllers/coinbase.controller")
module.exports = function (app) {
    app.post("/create-charge", coinbaseController.createCharge)
    // app.get("/sucess-payment", coinbaseController.sucessPayment)
}