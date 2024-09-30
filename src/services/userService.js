require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const saltRounds = 10;

const createUserService = async (name, email, password, discription) => {
    try {
        const user = await User.findOne({ name });
        if (user) {
            console.log('Chon username khac');
            return {
                EC: 0,
                EM: 'Trung username',
            };
        }

        // hash user password
        const hashPassword = await bcrypt.hash(password, saltRounds);
        // save user
        let result = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            discription: discription,
        });
        return { result };
    } catch (error) {
        console.log(error);
        return null;
    }
};

const loginService = async (name, password) => {
    try {
        //fecth user by email
        const user = await User.findOne({ name: name });
        if (user) {
            //compare password
            const isMatchPassword = await bcrypt.compare(password, user.password);
            if (!isMatchPassword) {
                return {
                    EC: 2,
                    EM: 'Email/Password khong hop le',
                };
            } else {
                const payload = {
                    email: user.email,
                    name: user.name,
                };
                const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRE,
                });
                //create an access token
                return {
                    EC: 0,
                    access_token,
                    user: {
                        email: user.email,
                        name: user.name,
                    },
                };
            }
        } else {
            return {
                EC: 1,
                EM: 'Email/Password khong hop le',
            };
        }

        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getAccountInfoService = async (name) => {
    try {
        const user = await User.findOne({ name });
        if (!user) {
            return {
                EC: 1,
                EM: 'User not found',
            };
        }

        return {
            EC: 0,
            EM: 'Get info successfully',
            info: {
                name: user.name,
                email: user.email,
                discription: user.discription,
                avatarPath: user.avatar,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 1,
            EM: 'An error occurred',
        };
    }
};

const updateUserService = async (name, discription, avatar) => {
    try {
        const user = await User.findOne({ name });
        if (!user) {
            return {
                EC: 1,
                EM: 'User not found',
            };
        }

        user.discription = discription;

        if (avatar && avatar.path) {
            user.avatar = avatar.path;
        } else {
            return {
                EC: 1,
                EM: 'Invalid avatar',
            };
        }

        await user.save();
        return {
            EC: 0,
            EM: 'User updated successfully',
            user: {
                name: user.name,
                email: user.email,
                discription: user.discription,
                avatar: user.avatar,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 1,
            EM: 'An error occurred',
        };
    }
};

module.exports = {
    createUserService,
    loginService,
    updateUserService,
    getAccountInfoService,
};
