const Statistics = require('../models/statistics');

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
        await Statistics.findByIdAndDelete(statisticsId);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

module.exports = {
    createStatisticsService,
    deleteStatisticsService,
};
