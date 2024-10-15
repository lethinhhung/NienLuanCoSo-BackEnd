const { createTestService, deleteTestService } = require('../services/testService');

const createTest = async (req, res) => {
    const { name, gradeWeight, maxScore, score, statisticsId } = req.body;
    const test = await createTestService(name, gradeWeight, maxScore, score, statisticsId);
    return res.status(200).json(test);
};

const deleteTest = async (req, res) => {
    const { testId } = req.body;
    const success = await deleteTestService(testId);
    return res.status(200).json({ success });
};

module.exports = {
    createTest,
    deleteTest,
};
