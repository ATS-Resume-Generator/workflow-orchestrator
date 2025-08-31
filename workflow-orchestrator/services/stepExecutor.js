const { promisify } = require('util');
const { exec } = require('child_process');
const Bull = require('bull');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');

const stepQueue = new Bull('stepQueue');

const stepSchema = Joi.object({
    name: Joi.string().required(),
    command: Joi.string().required(),
    params: Joi.object().optional(),
});

const executeStep = async (step) => {
    const { error } = stepSchema.validate(step);
    if (error) {
        throw new Error(`Step validation failed: ${error.message}`);
    }

    const { command, params } = step;
    const fullCommand = buildCommand(command, params);

    return promisify(exec)(fullCommand);
};

const buildCommand = (command, params) => {
    const paramString = params ? Object.entries(params).map(([key, value]) => `--${key}=${value}`).join(' ') : '';
    return `${command} ${paramString}`.trim();
};

stepQueue.process(async (job) => {
    try {
        const result = await executeStep(job.data);
        return result;
    } catch (error) {
        throw new Error(`Step execution failed: ${error.message}`);
    }
});

const addStepToQueue = (step) => {
    const jobId = uuidv4();
    return stepQueue.add(step, { jobId });
};

const getStepQueueMetrics = async () => {
    const completedCount = await stepQueue.getCompletedCount();
    const failedCount = await stepQueue.getFailedCount();
    const waitingCount = await stepQueue.getWaitingCount();
    return { completedCount, failedCount, waitingCount };
};

module.exports = {
    executeStep,
    addStepToQueue,
    getStepQueueMetrics,
};