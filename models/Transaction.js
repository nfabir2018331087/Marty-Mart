const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  currentBalance: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    require: true
  }
});

export default mongoose?.models.Transaction || mongoose.model('Transaction', transactionSchema);
