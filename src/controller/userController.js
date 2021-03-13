const userModel = require("../model/User");

async function allUser(req, res) {
    await userModel.find().populate("role")
        .then(doc => res.json(doc))
        .catch(err => console.error(err));
}

async function updateUser(req, res) {
    const iduser = req.params.iduser;
    const { user, pwd, role } = req.body;
    const isClient = await userModel.find({ _id: { $in: [iduser] }, role: "client" });

    if (isClient.length === 0) return res.json({ error: "User is not a client" });

    await userModel.findByIdAndUpdate(iduser, { user, pwd, role })
        .then(doc => res.json({ doc, updated: true }))
        .catch(err => console.error(err));
}

async function deleteUser(req, res) {
    const iduser = req.params.iduser;
    const isClient = await userModel.find({ _id: { $in: [iduser] }, role: "client" });

    if (isClient.length === 0) return res.json({ error: "User is not a client" });

    await userModel.findByIdAndDelete(iduser)
        .then(doc => res.json({ doc, deletd: true }))
        .catch(err => console.error(err));
}

module.exports = { updateUser, deleteUser, allUser }