const { Model } = require("sequelize")
import apiService from '../Service/apiService'
const testApi = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'test apiaaaaaaa'
    })
}
const hadleRegister = async (req, res) => {
    try {
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'Missing required parameters',// error message
                EC: '1', // error code
                DT: '', //data
            })
        }
        if (req.body.password && req.body.password.length < 4) {
            return res.status(200).json({
                EM: "your password must hane > 3",// error message
                EC: '1', // error code
                DT: '', //data
            })
        }
        //service: create user
        let data = await apiService.registerNewUser(req.body);
        return res.status(200).json({
            EM: data.EM,// error message
            EC: data.EC, // error code
            DT: '', //data
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error from sever',// error message
            EC: '-1', // error code
            DT: '', //data
        })
    }
}

const hadleLogin = async (req, res) => {
    try {
        let data = await apiService.hadleLogin(req.body);
        //set cookie
        if (data && data.DT && data.DT.access_token) {
            res.cookie("jwt", data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
        }
        return res.status(200).json({
            EM: data.EM,// error message
            EC: data.EC, // error code
            DT: data.DT, //data
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from sever',// error message
            EC: '-1', // error code
            DT: '', //data
        })
    }

}
const hadleLogout = (req, res) => {
    try {
        res.clearCookie("jwt");
        return res.status(200).json({
            EM: 'clearCookie',// error message
            EC: 0, // error code
            DT: '', //data
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from sever',// error message
            EC: '-1', // error code
            DT: '', //data
        })
    }
}
module.exports = {
    testApi, hadleRegister, hadleLogin, hadleLogout
}