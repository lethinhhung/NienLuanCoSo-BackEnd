const { createStatisticsService, deleteStatisticsService } = require('../services/statisticsService');

const createStatistics = async (req, res) => {
    const { owner, course, tests, projects } = req.body;
    const statistics = await createStatisticsService(owner, course, tests, projects);
    return res.status(200).json(statistics);
};

const deleteStatistics = async (req, res) => {
    const { statisticsId } = req.body;
    const success = await deleteStatisticsService(statisticsId);
    return res.status(200).json({ success });
};

module.exports = {
    createStatistics,
    deleteStatistics,
};
