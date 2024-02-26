// const mysql = require('mysql2');//promise
import db from '../models/index.js'
import mysql from 'mysql2/promise';
// import bluebird from 'bluebird'; can fix
require('dotenv').config();// su dung env
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

//create the connection database
// const connection = mysql.createPool({
//     host: 'localhost',
//     port: 3307, //default: 3306
//     user: 'root',
//     password:'dangdat0807',
//     database: 'reactjsdb',
//     // waitForConnections: true,
//     // connectionLimit: 10,
//     // queueLimit: 0,
//   });


const hashUserPassword = (userPassword) => {
    let hashpass = bcrypt.hashSync(userPassword, salt);
    return hashpass;
}

const createNewUser = async (email, password, username) => {
    let hashpassword = hashUserPassword(password)
    // let [results, fields] = await connection.query(
    //     `INSERT INTO Users (email, password, username) VALUES (?,?,?)`, [email, hashpassword, username],
    // );

    const aaa = await db.Users.create({
        username: username,
        email: email,
        password: hashpassword
    })


}

const getUserList = async () => {
    let newUser = await db.Users.findOne({
        where: { id: 1 },
        attributes: ["id", "username", "email"],
        include: { model: db.Group, attributes: ["name", "description"] },
        raw: true,
        nest: true,
    })

    let r = await db.Role.findAll({
        include: { model: db.Group, where: { id: 1 } },
        raw: true,
        nest: true
    })


    let users = [];
    // let [results, fields] = await connection.query(`SELECT*FROM Users `,        
    // );                 
    //     users = results;
    users = await db.Users.findAll();
    return users;

}

const deleteUser = async (id) => {
    // let [results, fields] = await connection.query(`DELETE FROM Users Where id = ?`,[id]);
    await db.Users.destroy({
        where: { id }
    })

}
const getUserById = async (id) => {
    // let [results,fields] = await connection.query(
    //     'select*FROM Users where id =?',[id]
    // )
    // let user = results && results.length>0 ? results[0] :{};
    let user = {};
    user = await db.Users.findOne({
        whrer: { id: id }
    })
    return user;
}

const updateUser = async (email, username, id) => {
    // let [results,fields] = await connection.query(
    //     `UPDATE Users 
    //     SET email=?, username = ?
    //     WHERE id = ?`, [email, username, id],
    // );

    await db.Users.update(
        { email: email, username: username },
        { where: { id: id } }
    );

}



module.exports = {
    createNewUser, hashUserPassword, getUserList, deleteUser,
    getUserById, updateUser
}