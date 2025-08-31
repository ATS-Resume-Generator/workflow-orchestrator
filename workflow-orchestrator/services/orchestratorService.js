const Workflow = require('../models/Workflow');
const Pipeline = require('../models/Pipeline');
const stepExecutor = require('./stepExecutor');
const stateManager = require('./stateManager');
const { v4: uuidv4 } = require('uuid');

class OrchestratorService {
    async createWorkflow(pipelineId, input) {
        const workflowId = uuidv4();
        const workflow = new Workflow({
            _id: workflowId,
            pipelineId,
            input,
            status: 'pending',
            executionHistory: [],
        });

        await workflow.save();
        return workflow;
    }

    async listWorkflows() {
        return await Workflow.find({});
    }

    async getWorkflowDetails(id) {
        return await Workflow.findById(id);
    }

    async triggerWorkflow(id) {
        const workflow = await this.getWorkflowDetails(id);
        if (!workflow || workflow.status !== 'pending') {
            throw new Error('Workflow not found or cannot be triggered');
        }

        workflow.status = 'running';
        await workflow.save();

        const pipeline = await Pipeline.findById(workflow.pipelineId);
        await stepExecutor.executeSteps(pipeline.steps, workflow);
    }

    async cancelWorkflow(id) {
        const workflow = await this.getWorkflowDetails(id);
        if (!workflow || workflow.status !== 'running') {
            throw new Error('Workflow not found or cannot be canceled');
        }

        workflow.status = 'canceled';
        await workflow.save();
    }

    async getWorkflowStatus(id) {
        const workflow = await this.getWorkflowDetails(id);
        if (!workflow) {
            throw new Error('Workflow not found');
        }

        return { status: workflow.status, executionHistory: workflow.executionHistory };
    }

    async definePipeline(steps) {
        const pipeline = new Pipeline({ steps });
        await pipeline.save();
        return pipeline;
    }

    async listPipelines() {
        return await Pipeline.find({});
    }
}

module.exports = new OrchestratorService();