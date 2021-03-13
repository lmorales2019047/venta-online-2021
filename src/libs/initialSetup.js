const RoleModel = require("../model/Role");
const userModel = require("../model/User");

async function createRoles() {
    const count = await RoleModel.estimatedDocumentCount();
    try {
        if (count > 0) return;

        const values = await Promise.all([
            new RoleModel({ name: 'admin' }).save(),
            new RoleModel({ name: 'client' }).save()
        ])

        console.log(values);
    } catch (error) {
        console.error(error);
    }
}

async function createInitialAccount() {
    const count = await userModel.estimatedDocumentCount();
    const foundRoles = await RoleModel.find({ name: { $in: "admin" } });
    const roleAdmin = await foundRoles.map(role => role._id)
    try {
        if (count > 0) return;

        const values = await Promise.all([
            new userModel({ user: "ADMIN", pwd: "123456", role: roleAdmin }).save()
        ]);

        console.log(values);
    } catch (error) {
        console.error(error);
    }
}

module.exports = { createRoles, createInitialAccount };