require('dotenv').config();
const Tag = require('../models/tag');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const createTagService = async (owner, name, color) => {
    try {
        const tag = await Tag.findOne({ name });
        if (tag) {
            console.log('Duplicate tag name');
            return {
                EC: 0,
                EM: 'Duplicate tag name',
            };
        }

        // save tag
        let result = await Tag.create({
            owner: owner,
            name: name,
            color: color,
        });
        return { result };
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getTagsInfoService = async (owner) => {
    try {
        let result = await Tag.find({ owner: owner });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

// const updateTagService = async (name, description, avatar) => {
//     try {
//         const user = await User.findOne({ name });
//         if (!user) {
//             return {
//                 EC: 1,
//                 EM: 'User not found',
//             };
//         }

//         ///delete old avatar file
//         if (user.avatar) {
//             const oldAvatarPath = path.join(user.avatar);

//             // Delete the old avatar file
//             fs.unlink(oldAvatarPath, (err) => {
//                 if (err) {
//                     console.error(`Failed to delete old avatar: ${err.message}`);
//                 } else {
//                     console.log('Old avatar deleted successfully');
//                 }
//             });
//         }
//         ///
//         user.description = description;

//         if (avatar && avatar.path) {
//             user.avatar = avatar.path;
//         } else {
//             return {
//                 EC: 1,
//                 EM: 'Invalid avatar',
//             };
//         }

//         await user.save();
//         return {
//             EC: 0,
//             EM: 'User updated successfully',
//             user: {
//                 name: user.name,
//                 email: user.email,
//                 description: user.description,
//                 avatar: user.avatar,
//             },
//         };
//     } catch (error) {
//         console.log(error);
//         return {
//             EC: 1,
//             EM: 'An error occurred',
//         };
//     }
// };

module.exports = {
    createTagService,
    // updateTagService,
    getTagsInfoService,
};
