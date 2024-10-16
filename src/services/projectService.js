const Project = require('../models/project');
const ProjectStep = require('../models/projectStep');
const Statistics = require('../models/statistics');

const createProjectService = async (name, totalSteps, completedSteps, steps, statisticsId) => {
    try {
        const project = await Project.create({ name, totalSteps, completedSteps, steps });
        const statistics = await Statistics.findById(statisticsId);

        statistics.projects.push(project._id);
        statistics.totalProjects += 1;
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

const getProjectInfoService = async (projectId) => {
    try {
        const project = await Project.findById(projectId);
        return project;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getProjectsInfoByIdsService = async (owner, projectsIds) => {
    try {
        let result = await Project.find({ _id: { $in: projectsIds } });
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const updateProjectCompletionService = async (projectId) => {
    try {
        const project = await Project.findById(projectId);
        const statistics = await Statistics.findOne({ projects: projectId });

        if (!project || !statistics) return null;

        const wasCompleted = project.completedSteps === project.totalSteps;
        project.completedSteps = project.steps.filter((step) => step.status).length;
        await project.save();

        const isCompleted = project.completedSteps === project.totalSteps;

        if (!wasCompleted && isCompleted) {
            statistics.completedProjects += 1;
        } else if (wasCompleted && !isCompleted) {
            statistics.completedProjects -= 1;
        }

        await statistics.save();

        return project;
    } catch (error) {
        console.error(error);
        return null;
    }
};

module.exports = {
    createProjectService,
    deleteProjectService,
    getProjectInfoService,
    getProjectsInfoByIdsService,
    updateProjectCompletionService,
};
