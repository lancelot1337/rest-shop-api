const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        //name of model
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1  //or required: true
    }
});

//model gives a constructor
module.exports = mongoose.model('Order', orderSchema);