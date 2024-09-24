const mongoose = require('mongoose');

// Define the schema
const incomeExpenditureSchema = new mongoose.Schema({
    no: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    income: {
        type: Number,
        required: true
    },
    expenses: {
        type: Number,
        required: true
    },
    profit: {
        type: Number,
        required: true,
        default: function () {
            return this.income - this.expenses;
        }
    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

// Create the model
const IncomeExpenditure = mongoose.model('IncomeExpenditure', incomeExpenditureSchema);

module.exports = IncomeExpenditure;
