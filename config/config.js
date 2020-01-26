const env = process.env.NODE_ENV || 'development';
const configs = require('./config.json');

const config = configs[env];
// const config = require('./config.json')[env];

module.exports = config;
