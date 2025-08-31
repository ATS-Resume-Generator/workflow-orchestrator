const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Pipeline = require('../models/Pipeline');

// Validation schema for pipeline creation
const pipelineSchema = Joi.object({
    name: Joi.string().required(),
    steps: Joi.array().items(Joi.string()).required(),
});

// POST /pipelines - Define new pipeline templates
router.post('/', async (req, res) => {
    const { error } = pipelineSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const pipeline = new Pipeline({
        name: req.body.name,
        steps: req.body.steps,
    });

    try {
        const savedPipeline = await pipeline.save();
        res.status(201).json(savedPipeline);
    } catch (err) {
        res.status(500).send('Error saving pipeline: ' + err.message);
    }
});

// GET /pipelines - List available pipeline templates
router.get('/', async (req, res) => {
    try {
        const pipelines = await Pipeline.find();
        res.status(200).json(pipelines);
    } catch (err) {
        res.status(500).send('Error retrieving pipelines: ' + err.message);
    }
});

module.exports = router;