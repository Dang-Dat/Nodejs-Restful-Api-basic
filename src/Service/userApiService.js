import db from '../models/index'
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (userPassword) => {
    let hashpass = bcrypt.hashSync(userPassword, salt);
    return hashpass;
}

const getAllUser = async () => {
    try {
        let users = await db.Users.findAll({
            attributes: ["id", "username", "email", "phone", 'sex'],
            include: { model: db.Group, attributes: ["name", "description"] },
            // raw: true,
            // nest: true,
        });
        if (users) {
            return {
                EM: 'get data success',
                EC: 0,
                DT: users,
            }
        } else {
            return {
                EM: 'get data success',
                EC: 0,
                DT: [],
            }
        }
        return users
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'something wrong with services',// error message
            EC: '1', // error code
            DT: [], //data
        })
    }
}

const getUserPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.Users.findAndCountAll({
            attributes: ["id", "username", "email", "phone", 'sex', 'address'],
            include: { model: db.Group, attributes: ["name", "description", "id"] },
            offset: offset,
            limit: limit,
            order: [
                ['id', 'ASC'],
            ]
        })
        let totalPage = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPage: totalPage,
            users: rows,

        }
        return ({
            EM: 'fetch OK',// error message
            EC: 0, // error code
            DT: data, //data
        })

    } catch (e) {
        console.log(e);
        return ({
            EM: 'something wrong with services',// error message
            EC: '1', // error code
            DT: [], //data
        })
    }
}
// const checkData = async (email, phone) => {
//     let user = await db.Users.findOne({
//         where: {
//             [Op.or]: [
//                 { email: email },
//                 { phone: phone }
//             ]
//         }
//     })

//     if (user) {
//         return true;
//     }
//     return false;
// }
const createNewUser = async (data) => {

    try {
        let user = await db.Users.findOne({
            where: {
                [Op.or]: [
                    { email: data.email },
                    { phone: data.phone }
                ]
            }
        })
        if (user) {
            if (user.email === data.email) {
                return {
                    EM: 'User already',
                    EC: '1',
                    DT: 'email',
                };
            } else if (user.phone === data.phone) {
                return {
                    EM: 'User already',
                    EC: '1',
                    DT: 'phone',
                };
            }
        }
        let hashpassword = hashUserPassword(data.password)
        await db.Users.create({
            email: data.email,
            username: data.username,
            phone: data.phone,
            sex: data.sex,
            address: data.address,
            password: hashpassword,
            groupId: data.groupId,
        });
        return {
            EM: 'create success',
            EC: 0,
            DT: [],
        }

    } catch (e) {
        console.log(e);
        return {
            EM: 'something wrongs with servies',
            EC: 1,
            DT: [],
        }
    }
}

const updateUser = async (data) => {
    try {
        if (!data.groupId) {
            return {
                EM: 'Error with empty groupId ',
                EC: 1,
                DT: 'group',
            }
        }
        let user = await db.Users.findOne({
            where: { id: data.id }
        })
        if (user) {
            //update
            console.log('>>checkdata: ', user)
            await user.update({
                username: data.username,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId,
            })
            return {
                EM: 'Update user success ',
                EC: 0,
                DT: '',
            }
        } else {
            return {
                EM: 'Cant not found user ',
                EC: 2,
                DT: '',
            }
        }
    } catch (e) {
        return {
            EM: 'something wrongs with servies',
            EC: 1,
            DT: [],
        }
    }
}
const deleteUser = async (id) => {
    try {
        let user = await db.Users.findOne({
            where: { id: id }
        })
        if (user) {
            await user.destroy();
            return ({
                EM: 'delete oke',// error message
                EC: 0, // error code
                DT: [], //data
            })
        } else {
            return ({
                EM: 'User not exit',// error message
                EC: 2, // error code
                DT: [], //data
            })
        }

    } catch (e) {
        console.log(e)
        return ({
            EM: 'error from service',// error message
            EC: 1, // error code
            DT: [], //data
        })
    }
}


module.exports = {
    deleteUser, updateUser, createNewUser, getAllUser,
    getUserPagination

}