const {
    DOMAIN
} = require("../config/dotenv.config")

const { resources } = require("coinbase-commerce-node");

const { Charge } = resources

module.exports.createCharge = async (req, res) => {
    const { local_price, description } = req.body
    const chargeData = {
        name : "Compra de Tienda Online",
        description,
        local_price,
        pricing_type: "fixed_price",
        redirect_url: `${DOMAIN}/sucess-payment`,
        cancel_url: `${DOMAIN}/cancel-payment`,
    }
    const charge = await Charge.create(chargeData );
    res.send(charge); 
}
