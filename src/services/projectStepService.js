const ProjectStep = require('../models/projectStep');
const Project = require('../models/project');

const createProjectStepService = async (name, status, projectId) => {
    try {
        const projectStep = await ProjectStep.create({ name, status });
        const project = await Project.findById(projectId);

        project.steps.push(projectStep._id);
        project.save();

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

const getProjectStepInfoService = async (projectStepId) => {
    try {
        const projectStep = await ProjectStep.findById(projectStepId);
        return projectStep;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getProjectStepsInfoByIdsService = async (owner, projectStepsIds) => {
    try {
        let result = await ProjectStep.find({ _id: { $in: projectStepsIds } });
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
};

module.exports = {
    createProjectStepService,
    deleteProjectStepService,
    getProjectStepInfoService,
    getProjectStepsInfoByIdsService,
};
