
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan'); // logger

const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const { stream } = require('./config/winston');
const swaggerDocument = require('./swagger');
const indexRouter = require('./routes/index');

const app = express();

app.use(morgan('combined', { stream }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use('/api/v1/', indexRouter);
console.log('process.env.NODE_ENV', process.env.NODE_ENV);

module.exports = app;
