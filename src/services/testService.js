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

const getTestInfoService = async (testId) => {
    try {
        const test = await Test.findById(testId);
        return test;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getTestsInfoByIdsService = async (owner, testsIds) => {
    try {
        let result = await Test.find({ _id: { $in: testsIds } });
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
};

module.exports = {
    createTestService,
    deleteTestService,
    getTestInfoService,
    getTestsInfoByIdsService,
};
