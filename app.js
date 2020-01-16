const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const indexRouter = require('./routes/index');

const apiVersion = '1.0.0';
const majorVersion = apiVersion.split('.')[0];
const basePath = `/api/v${majorVersion}/`;

// Swagger definition
// You can set every attribute except paths and swagger
// https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
const swaggerDefinition = {
  info: { // API informations (required)
    title: 'Ant API Service', // Title (required)
    version: apiVersion, // Version (required)
    description: 'Ant 웹서비스를 위한 API 문서', // Description (optional)
  },
  host: process.env.host || 'localhost', // Host (optional)
  basePath, // Base path (optional)
};
// Options for the swagger docs
const options = {
  // Import swaggerDefinitions
  swaggerDefinition,
  // Path to the API docs
  apis: ['./routes/controllers/*.js'],
};
// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

const app = express();
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(basePath, indexRouter);


module.exports = app;
