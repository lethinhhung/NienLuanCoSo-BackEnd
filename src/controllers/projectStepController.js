const { createProjectStepService, deleteProjectStepService } = require('../services/projectStepService');

const createProjectStep = async (req, res) => {
    const { name, status } = req.body;
    const projectStep = await createProjectStepService(name, status);
    return res.status(200).json(projectStep);
};

const deleteProjectStep = async (req, res) => {
    const { projectStepId } = req.body;
    const success = await deleteProjectStepService(projectStepId);
    return res.status(200).json({ success });
};

module.exports = {
    createProjectStep,
    deleteProjectStep,
};