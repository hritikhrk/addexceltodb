const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    MONGODB_URL : process.env.MONGODB_URL || 'mongodb://localhost:27017/klimbdb',
    PORT : process.env.PORT || 5000
}