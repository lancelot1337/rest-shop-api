const express = require('express');
const app = express();
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders')
const morgan = require('morgan');
const bodyParser = require('body-parser');

//for logging
app.use(morgan('dev'));

//for bodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//to handle cross-origin resource sharing (CORS) errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    //browser send an OPTIONS request when we send post or put request
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//routes to productRoutes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//for error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;