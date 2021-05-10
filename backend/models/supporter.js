const mongoose = require('mongoose')

const supporterSchema = new mongoose.Schema({
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
    creationDate: {
        type: Date,
        default: Date.now,
        required: true
     },
     role: {
         type: String,
         require: false
     }

})

module.exports = mongoose.model('Supporter', supporterSchema) 