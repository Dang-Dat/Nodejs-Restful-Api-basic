import userApiService from '../Service/userApiService';

const read = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;


            let data = await userApiService.getUserPagination(+page, +limit);

            return res.status(200).json({
                EM: data.EM,// error message
                EC: data.EC, // error code
                DT: data.DT, //data
            })


        } else {
            let data = await userApiService.getAllUser();

            return res.status(200).json({
                EM: data.EM,// error message
                EC: data.EC, // error code
                DT: data.DT, //data
            })
        }


        // let data = await userApiService.getAllUser();

        // return res.status(200).json({
        //     EM: data.EM,// error message
        //     EC: data.EC, // error code
        //     DT: data.DT, //data
        // })
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
        if (!req.body.email || !req.body.phone || !req.body.password || !req.body.group) {
            return res.status(200).json({
                EM: 'Missing required parameters or already email, phone',// error message
                EC: '1', // error code
                DT: '', //data
            })
        }
        //create 

        let data = await userApiService.createNewUser(req.body);
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
        let data = await userApiService.deleteUser(req.body.id);
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
const getUserAccount = async (req, res) => {
    try {
        return res.status(200).json({
            EM: 'ok',
            EC: 0,
            DT: {
                access_token: req.token,
                groupWithRoles: req.user.groupWithRoles,
                email: req.user.email,
                username: req.user.username
            }
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'chua dang nhap',// error message
            EC: '-1', // error code
            DT: '', //data
        })
    }

}

module.exports = {
    read, create, update, deleteUser, getUserAccount
}