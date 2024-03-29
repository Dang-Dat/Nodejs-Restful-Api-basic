import groupService from '../Service/groupService'
const read = async (req, res) => {
    try {
        let data = await groupService.getGroup();
        return res.status(200).json({
            EM: data.EM,// error message
            EC: data.EC, // error code
            DT: data.DT, //data
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: 'something wrong from sever',// error message
            EC: '-1', // error code
            DT: '', //data
        })
    }
}


module.exports = {
    read
}