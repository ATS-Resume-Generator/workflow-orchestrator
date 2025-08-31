const mongoose = require('mongoose');
const Workflow = require('../models/Workflow');
const Pipeline = require('../models/Pipeline');

class StateManager {
    async createWorkflow(data) {
        const workflow = new Workflow(data);
        return await workflow.save();
    }

    async getWorkflowById(id) {
        return await Workflow.findById(id);
    }

    async listWorkflows() {
        return await Workflow.find();
    }

    async updateWorkflowStatus(id, status) {
        return await Workflow.findByIdAndUpdate(id, { status }, { new: true });
    }

    async deleteWorkflow(id) {
        return await Workflow.findByIdAndDelete(id);
    }

    async createPipeline(data) {
        const pipeline = new Pipeline(data);
        return await pipeline.save();
    }

    async listPipelines() {
        return await Pipeline.find();
    }

    async getPipelineById(id) {
        return await Pipeline.findById(id);
    }

    async updatePipeline(id, data) {
        return await Pipeline.findByIdAndUpdate(id, data, { new: true });
    }

    async deletePipeline(id) {
        return await Pipeline.findByIdAndDelete(id);
    }
}

module.exports = new StateManager();