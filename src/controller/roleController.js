import userApiService from '../Service/userApiService';
import roleApiService from '../Service/roleApiService'
const read = async (req, res) => {
    try {

        let data = await roleApiService.getAllRoles();

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

const create = async (req, res) => {
    try {
        //phai validdate


        let data = await roleApiService.createNewRoles(req.body);
        return res.status(200).json({
            EM: 'Create success',// error message
            EC: 0, // error code
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
const update = async (req, res) => {
    try {
        //phai validdate    /// 

        let data = await userApiService.updateUser(req.body);
        return res.status(200).json({
            EM: 'Update success',// error message
            EC: 0, // error code
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
const deleteUser = async (req, res) => {
    try {
        let data = await roleApiService.deleteRole(req.body.id);
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
const getRoleByGroup = async (req, res) => {
    try {
        let id = req.params.groupId
        let data = await roleApiService.getRoleByGroup(id);
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
const assignRoleToGroup = async (req, res) => {
    try {

        let data = await roleApiService.assignRoleToGroup(req.body.data);
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
module.exports = {
    read, create, update, deleteUser, getRoleByGroup, assignRoleToGroup
}