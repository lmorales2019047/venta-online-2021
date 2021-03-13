const UserModel = require("../model/User");
const jwt = require("jsonwebtoken");
const Role = require("../model/Role")

async function signIn(req, res) {
    const userFound = await UserModel.findOne({ user: req.body.user });
    if (!userFound) return res.json({ message: "User not found" });

    const matchPassword = await UserModel.comparePassword(req.body.pwd, userFound.pwd)
    if (!matchPassword) return res.json({ token: null, "message": "Invalid Password" })

    console.log(userFound);

    const token = jwt.sign({ id: userFound._id }, "ventaonline", {
        expiresIn: 86400
    })
    res.json({ token });
}

async function signUp(req, res) {
    const { user, pwd, role } = req.body;
    const newPwd = await UserModel.encryptPassword(pwd);
    const newUser = new UserModel({ user, pwd: newPwd });

    const foundRoles = await Role.find({ name: { $in: role } });

    if (foundRoles.length === 0) return res.json({ error: "Role is not valid" });
    newUser.role = foundRoles.map(role => role._id);

    await newUser.save()
        .then(doc => res.json(doc))
        .catch(err => console.error(err));
}

module.exports = { signIn, signUp }