const express = require('express');
const app = express();
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//for mongoose
mongoose.connect('mongodb://node-rest-shop:' + process.env.MONGODB_PWD + '@node-rest-shop-shard-00-00-4b5cx.mongodb.net:27017,node-rest-shop-shard-00-01-4b5cx.mongodb.net:27017,node-rest-shop-shard-00-02-4b5cx.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin&retryWrites=true', {
    useMongoClient: true
});

// mongoose.connect('mongodb://localhost/node-rest-shop').then(()=>{
// 	console.log('db connect');
// },(e)=>{
// 	console.log('error:'+ e)
// })

mongoose.Promise = global.Promise;

//for logging
app.use(morgan('dev'));

//making uploads statically available
app.use('/uploads', express.static('uploads'));

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
app.use('/user', userRoutes);

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