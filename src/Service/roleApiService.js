import db from '../models/index'
const createNewRoles = async (roles) => {
    try {
        let currentRoles = await db.Role.findAll({
            attributes: ['url', 'description'],
            raw: true
        })
        const persists = roles.filter(({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url1 === url2))
        if (persists.length === 0) {
            return {
                EM: 'Nothing to create',
                EC: 0,
                DT: [],
            }
        }
        await db.Role.bulkCreate(persists);

        return {
            EM: 'create role success',
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
const getAllRoles = async () => {
    try {

        let data = await db.Role.findAll();

        return {
            EM: 'Get role success',
            EC: 0,
            DT: data,
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
const deleteRole = async (id) => {
    try {
        let role = await db.Role.findOne({
            where: { id: id }
        })
        await role.destroy();

        return {
            EM: 'Delete role success',
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
const getRoleByGroup = async (id) => {
    try {
        if (!id) {
            return {
                EM: 'not found any roles',
                EC: 0,
                DT: [],
            }
        }

        let role = await db.Group.findOne({
            where: { id: id },
            attributes: ["id", "name", "description"],
            include: {
                model: db.Role,
                attributes: ["id", "url", "description"],
                through: { attributes: [] }
            },
        })


        return {
            EM: 'get role by group success',
            EC: 0,
            DT: role,
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
const assignRoleToGroup = async (data) => {
    try {

        await db.GroupRole.destroy({
            where: { groupId: +data.groupId }
        })
        await db.GroupRole.bulkCreate(data.groupRoles)
        return {
            EM: 'Assign role to group success',
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

module.exports = { createNewRoles, getAllRoles, deleteRole, getRoleByGroup, assignRoleToGroup }