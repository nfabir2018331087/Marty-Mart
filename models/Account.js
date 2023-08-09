const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  accountNo: {
    type: String,
    required: true
  },
  secret: {
    type: String,
    required: true
  },
  bank: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    default: 0,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
});

export default mongoose?.models.Account || mongoose.model('Account', accountSchema);
