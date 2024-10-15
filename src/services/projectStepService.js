const ProjectStep = require('../models/projectStep');

const createProjectStepService = async (name, status) => {
    try {
        const projectStep = await ProjectStep.create({ name, status });
        return projectStep;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const deleteProjectStepService = async (projectStepId) => {
    try {
        await ProjectStep.findByIdAndDelete(projectStepId);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

module.exports = {
    createProjectStepService,
    deleteProjectStepService,
};
