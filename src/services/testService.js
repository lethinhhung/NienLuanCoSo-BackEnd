const Test = require('../models/test');
const Statistics = require('../models/statistics');

const createTestService = async (name, gradeWeight, maxScore, score, statisticsId) => {
    try {
        const test = await Test.create({ name, gradeWeight, maxScore, score });
        const statistics = await Statistics.findById(statisticsId);
        statistics.tests.push(test._id);
        statistics.save();

        return test;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const deleteTestService = async (testId) => {
    try {
        const test = await Test.findByIdAndDelete(testId);
        return test;
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = {
    createTestService,
    deleteTestService,
};
