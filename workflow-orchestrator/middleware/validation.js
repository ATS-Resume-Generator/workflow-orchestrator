const Joi = require('joi');

const workflowSchema = Joi.object({
    name: Joi.string().min(3).required(),
    steps: Joi.array().items(Joi.string()).required(),
    schedule: Joi.string().optional(),
});

const pipelineSchema = Joi.object({
    name: Joi.string().min(3).required(),
    steps: Joi.array().items(Joi.string()).required(),
});

const validateWorkflow = (req, res, next) => {
    const { error } = workflowSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

const validatePipeline = (req, res, next) => {
    const { error } = pipelineSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = {
    validateWorkflow,
    validatePipeline,
};