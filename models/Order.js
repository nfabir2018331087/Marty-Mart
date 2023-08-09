const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true
  },
  itemQty: {
    type: Number,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  seller: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  buyer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  orderPrice: {
    type: Number,
    required: true
  },
  orderStat: {
    type: String,
    required: true
  }
});

export default mongoose?.models.Order || mongoose.model('Order', orderSchema);
