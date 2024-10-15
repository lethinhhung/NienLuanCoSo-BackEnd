const Project = require('../models/project');

const createProjectService = async (name, totalSteps, completedSteps, steps) => {
    try {
        const project = await Project.create({ name, totalSteps, completedSteps, steps });
        return project;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const deleteProjectService = async (projectId) => {
    try {
        await Project.findByIdAndDelete(projectId);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

module.exports = {
    createProjectService,
    deleteProjectService,
};
