const Test = require('../models/test');

const createTestService = async (name, gradeWeight, maxScore, score) => {
    try {
        const test = await Test.create({ name, gradeWeight, maxScore, score });
        return test;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const deleteTestService = async (testId) => {
    try {
        await Test.findByIdAndDelete(testId);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

module.exports = {
    createTestService,
    deleteTestService,
};
