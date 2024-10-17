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
        // Find and delete the test
        const test = await Test.findByIdAndDelete(testId);
        if (!test) return null;

        // Find the statistics document that contains the test ID
        const statistics = await Statistics.findOne({ tests: testId });
        if (statistics) {
            // Remove the test ID from the tests array
            statistics.tests = statistics.tests.filter((tId) => tId.toString() !== testId.toString());
            if (test.score !== -1) {
                statistics.completedGradeWeight -= test.gradeWeight;
                statistics.completedScore -= (test.score / test.maxScore) * test.gradeWeight;
            }
            await statistics.save();
        }

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

const updateTestScoreService = async (testId, newScore) => {
    try {
        const test = await Test.findById(testId);
        const statistics = await Statistics.findOne({ tests: testId });

        if (!test || !statistics) return null;

        const oldScore = test.score;
        const oldCompletedScore = statistics.completedScore;
        test.score = newScore;
        await test.save();

        // const completedTestIds = statistics.tests.filter((tId) => tId.toString() !== testId.toString());
        // const completedTests = await Test.find({ _id: { $in: completedTestIds }, score: { $ne: -1 } });

        // const completedGradeWeight = completedTests.reduce((sum, t) => sum + t.gradeWeight, 0);
        // const completedScore = completedTests.reduce((sum, t) => sum + (t.score / t.maxScore) * t.gradeWeight, 0);
        if (oldScore === -1) {
            statistics.completedGradeWeight = statistics.completedGradeWeight + test.gradeWeight;
            statistics.completedScore = oldCompletedScore + (newScore / test.maxScore) * test.gradeWeight;
            await statistics.save();
        } else {
            statistics.completedScore =
                oldCompletedScore -
                (oldScore / test.maxScore) * test.gradeWeight +
                (newScore / test.maxScore) * test.gradeWeight;

            await statistics.save();
        }

        return test;
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
    updateTestScoreService,
};
