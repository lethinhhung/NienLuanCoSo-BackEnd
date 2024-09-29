require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const updateUserService = async (userId, discription, avatar) => {
    const updateData = { discription };
    if (avatar) {
        updateData.avatar = {
            data: avatar.buffer,
            contentType: avatar.mimetype,
        };
    }
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    return user;
};

module.exports = {
    createUserService,
    loginService,
    updateUserService,
};
