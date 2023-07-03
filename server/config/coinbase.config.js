const {
    COINBASE_API_KEY,
} = require("./dotenv.config")

const coinbase = require("coinbase-commerce-node")
const Client = coinbase.Client
Client.init(COINBASE_API_KEY)

