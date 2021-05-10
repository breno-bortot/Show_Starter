const mongoose = require('mongoose')
const path = require('path')
const projectMediaBasePath = 'uploads/projectMedia'

let projectSchemaOptions = {
    toJSON: {
        virtuals: true
    }
}

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Creator',
        required: false
    },
    eventDate: {
        type: Date,
        required: true
    },
    locality: {
        type:  String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    video: {
        type: String,
        required: false
    },
    rewards: {
        type: String,
        required: false
    },
    fundGoal: {
        type: Number,
        required: true
    },
    expiresOn: {
        type: Date,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: true
    }
}, projectSchemaOptions)

projectSchema.virtual('imagePath').get(function() {
    if (this.image !== null){
        return path.join('/', projectMediaBasePath, this.image)
    }   
    
})
projectSchema.virtual('videoPath').get(function() {
    if (this.video !== null){
        return path.join('/', projectMediaBasePath, this.video)
    }   
    
})

module.exports = mongoose.model('Project', projectSchema)

module.exports.projectMediaBasePath = projectMediaBasePath
