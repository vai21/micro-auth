require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const winston = require('./config/winston');

const app = express();
const port = process.env.PORT || 3000;
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================  all routes  =======================================
const loginRoute = require('./routers/login');
const baseRoute = require('./routers/base');

app.use(loginRoute);
app.use(baseRoute);
// ============================  all routes  =======================================

app.get('/', (req, res) => res.send('Authentication API V1'));

app.listen(port, () => winston.log('info', `authentication service listening on port ${port}!`));
