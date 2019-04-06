const mongoose = require('mongoose');

const { Schema } = mongoose;


const OrdersSchema = new Schema({
    productId: String,
    productName: String,
    qty: String,
    prize:String,

  });
  
OrdersSchema.methods.toAuthJSON = function() {
    return {
        productId: this.productId,
        productName: this.productName,
        qty: this.qty,
        prize:this.prize,
    };
  };

  mongoose.model('Orders', OrdersSchema);