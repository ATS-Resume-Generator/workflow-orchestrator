const express = require('express');
const router = express.Router();
const orchestratorService = require('../services/orchestratorService');
const { validateWorkflow } = require('../middleware/validation');

// POST /workflows - Create new workflow execution
router.post('/', validateWorkflow, async (req, res) => {
    try {
        const workflow = await orchestratorService.createWorkflow(req.body);
        res.status(201).json(workflow);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /workflows - List all workflows with status
router.get('/', async (req, res) => {
    try {
        const workflows = await orchestratorService.getAllWorkflows();
        res.status(200).json(workflows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /workflows/:id - Get specific workflow details
router.get('/:id', async (req, res) => {
    try {
        const workflow = await orchestratorService.getWorkflowById(req.params.id);
        if (!workflow) {
            return res.status(404).json({ message: 'Workflow not found' });
        }
        res.status(200).json(workflow);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /workflows/:id/trigger - Manually trigger workflow
router.post('/:id/trigger', async (req, res) => {
    try {
        const result = await orchestratorService.triggerWorkflow(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /workflows/:id/cancel - Cancel running workflow
router.post('/:id/cancel', async (req, res) => {
    try {
        const result = await orchestratorService.cancelWorkflow(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /workflows/:id/status - Get real-time workflow status
router.get('/:id/status', async (req, res) => {
    try {
        const status = await orchestratorService.getWorkflowStatus(req.params.id);
        res.status(200).json(status);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;