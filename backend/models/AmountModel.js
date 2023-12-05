const mongoose = require('mongoose');

const AmountSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }],
}, {timestamps: true})

module.exports = mongoose.model('Amount', AmountSchema)