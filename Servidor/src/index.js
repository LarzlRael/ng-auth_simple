const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
// importando la base de datos
require('./database');
const indexRouter = require('./routes/userRoutes')

// settings
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
// importtando el enrutador
app.use('/api',indexRouter);

app.listen(3000);
console.log('server on port ', 3000);