const Statistics = require('../models/statistics');

const { deleteProjectService } = require('./projectService');
const { deleteTestService } = require('./testService');

const createStatisticsService = async (owner, course, tests, projects) => {
    try {
        const statistics = await Statistics.create({ owner, course, tests, projects });
        return statistics;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const deleteStatisticsService = async (statisticsId) => {
    try {
        const statistics = await Statistics.findByIdAndDelete(statisticsId);

        // Delete associated projects
        if (statistics.projects) {
            for (const projectId of statistics.projects) {
                await deleteProjectService(projectId);
            }
        }

        // Delete associated tests
        if (statistics.tests) {
            for (const testId of statistics.tests) {
                await deleteTestService(testId);
            }
        }

        return statistics;
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = {
    createStatisticsService,
    deleteStatisticsService,
};
