require('dotenv').config();
import db from '../models/index';
import { Op } from 'sequelize';
import { getGroupWithRoles } from '.././Service/JWTService'
import { createJwt } from '.././middleware/jwtAction'
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (userPassword) => {
    let hashpass = bcrypt.hashSync(userPassword, salt);
    return hashpass;
}
const checkEmail = async (userEmail) => {
    let user = await db.Users.findOne({
        where: { email: userEmail }
    })
    if (user) {
        return true;
    }
    return false;
}
const checkPhone = async (userPhone) => {
    let user = await db.Users.findOne({
        where: { phone: userPhone }
    })
    if (user) {
        return true;
    }
    return false;
}

const registerNewUser = async (rawUserData) => {
    try {
        let isEmailExist = await checkEmail(rawUserData.email);
        if (isEmailExist === true) {
            return {
                EM: 'The email already exist',// error message
                EC: '1'
            }
        }
        let isPhoneExist = await checkPhone(rawUserData.phone);
        if (isPhoneExist === true) {
            return {
                EM: 'The Phonenumber already exist',// error message
                EC: '1'
            }
        }
        let hashpassword = hashUserPassword(rawUserData.password)

        //create new user     
        await db.Users.create({
            email: rawUserData.email,
            username: rawUserData.username,
            phone: rawUserData.phone,
            password: hashpassword,
            groupId: 4,
        })
        return {
            EM: 'Created user successfully',
            EC: 0
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'something wrongs in service...',
            EC: -2
        }
    }
}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword)
}
const hadleLogin = async (rawData) => {
    try {
        let user = await db.Users.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin }
                ]
            }
        })
        if (user) {
            let isPassword = checkPassword(rawData.password, user.password);
            if (isPassword === true) {
                // let token =
                //test toles:
                let groupWithRoles = await getGroupWithRoles(user);
                let payload = {
                    email: user.email,
                    groupWithRoles,
                    username: user.username,
                    // expiresIn: process.env.JWT_EXPIRES_IN,// 60 miliseconds
                }
                let token = createJwt(payload);
                return {
                    EM: 'ok',// error message
                    EC: '0',
                    DT: {
                        access_token: token,
                        groupWithRoles,
                        email: user.email,
                        username: user.username
                    }
                }
            }
        }
        return {
            EM: 'tai khoan or mat khau d eo dung',// error message
            EC: '1',
            DT: '',
        }

    } catch (e) {
        console.log(e)
        return {
            EM: 'something wrongs in service...',
            EC: -2
        }
    }
}

module.exports = {
    registerNewUser, hadleLogin
}