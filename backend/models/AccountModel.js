const mongoose = require('mongoose');


const AccountSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    bank: {
        type: String,
        required: true,
        maxLength: 20,
        trim: true
    },
    percentage: {
        type: Number,
        required: true,
        trim: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0,
        trim: true
    },
    withdrawals: [
        {
          amount: {
            type: Number,
            required: true,
          },
          timestamp: {
            type: Date,
            default: Date.now,
          },
          
        },
      ],
    
}, {timestamps: true})

module.exports = mongoose.model('Account', AccountSchema)