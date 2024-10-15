const { createProjectService, deleteProjectService } = require('../services/projectService');

const createProject = async (req, res) => {
    const { name, totalSteps, completedSteps, steps, statisticsId } = req.body;
    const project = await createProjectService(name, totalSteps, completedSteps, steps, statisticsId);
    return res.status(200).json(project);
};

const deleteProject = async (req, res) => {
    const { projectId } = req.body;
    const success = await deleteProjectService(projectId);
    return res.status(200).json({ success });
};

module.exports = {
    createProject,
    deleteProject,
};
