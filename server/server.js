require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser');

require('./config/mongoose.config');
require("./config/coinbase.config")
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { db1, db2, db3 } = require('./config/mongoose.config');
const itemRoutes = require('./routes/item.routes')(app);
const userRoutes = require('./routes/user.routes')(app);
const ventaRoutes = require('./routes/venta.routes')(app);
require("./routes/coinbase.routes")(app);
app.listen(8000, () => {
    console.log("Listening at Port 8000")
});