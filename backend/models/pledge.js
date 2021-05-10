const mongoose = require('mongoose')

const pledgeSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    supporterId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Supporter',
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    reward: {
        type: String,
        required: true
    },
    expiresOn: {
        type: mongoose.Schema.Types.Date,
        ref:'Project',
        required: true
    },
      creationDate: {
        type: Date,
        default: Date.now,
        required: true
     }
    })

module.exports = mongoose.model('Pledge', pledgeSchema)