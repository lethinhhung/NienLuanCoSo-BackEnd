const Project = require('../models/project');
const ProjectStep = require('../models/projectStep');
const Statistics = require('../models/statistics');

const createProjectService = async (name, totalSteps, completedSteps, steps, statisticsId) => {
    try {
        const project = await Project.create({ name, totalSteps, completedSteps, steps });
        const statistics = await Statistics.findById(statisticsId);
        statistics.projects.push(project._id);
        statistics.save();

        return project;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const deleteProjectService = async (projectId) => {
    try {
        const project = await Project.findByIdAndDelete(projectId);

        // Delete associated project steps
        if (project.steps) {
            for (const stepId of project.steps) {
                await ProjectStep.findByIdAndDelete(stepId);
            }
        }

        return project;
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = {
    createProjectService,
    deleteProjectService,
};
