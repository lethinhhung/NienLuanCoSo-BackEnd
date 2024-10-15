const { createTestService, deleteTestService } = require('../services/testService');

const createTest = async (req, res) => {
    const { name, gradeWeight, maxScore, score } = req.body;
    const test = await createTestService(name, gradeWeight, maxScore, score);
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
