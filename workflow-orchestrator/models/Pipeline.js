const mongoose = require('mongoose');

const pipelineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    steps: [{
        type: String,
        required: true
    }],
    dependencies: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

pipelineSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Pipeline = mongoose.model('Pipeline', pipelineSchema);

module.exports = Pipeline;