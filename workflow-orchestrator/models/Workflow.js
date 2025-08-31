const mongoose = require('mongoose');

const workflowSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'running', 'completed', 'failed'],
        default: 'pending',
    },
    executionHistory: [{
        step: String,
        status: String,
        timestamp: {
            type: Date,
            default: Date.now,
        },
        error: String,
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    metadata: {
        type: Object,
        default: {},
    },
});

workflowSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Workflow = mongoose.model('Workflow', workflowSchema);

module.exports = Workflow;