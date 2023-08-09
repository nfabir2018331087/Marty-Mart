const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  supplierId: {
    type: String,
    required: true
  },
  productId: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true,
    default: 1
  }
});

export default mongoose?.models.CartItem || mongoose.model('CartItem', cartItemSchema);
