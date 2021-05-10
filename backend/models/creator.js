const mongoose = require('mongoose')

const creatorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpf: {
        type: Number,
        required: true
    },
    bankAccount: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: true
     },
     role: {
         type: String,
         required: false
     }

    })

module.exports = mongoose.model('Creator', creatorSchema)