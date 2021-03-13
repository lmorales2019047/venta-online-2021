const UserModel = require("../model/User");
const jwt = require("jsonwebtoken");
const RoleModel = require("../model/Role")

async function verifyToken(req, res, next) {
    try {
        const token = await req.headers["x-access-token"];

        console.log(token);

        if (!token) return res.status(403).json({ message: "No token provided" });

        const decoded = jwt.verify(token, "controlalumno");
        req.userId = decoded.id;

        const user = await UserModel.findById(req.userId, { password: 0 });
        if (!user) return res.status(404).json({ message: "No user found" });
        console.log(decoded);

        next();
    } catch (error) {
        return res.json({ message: "Unauthorized" });
    }
}

async function isUser(req, res, next) {
    const user = await UserModel.findById(req.userId);
    const role = await RoleModel.find({ _id: { $in: user.role } });
    for (let i = 0; i < role.length; i++) {
        if (role[i].name === "user") {
            next();
            return;
        }
    }
    return res.status(200).json({ message: "You have be a user" });
}

async function isAdmin(req, res, next) {
    const user = await UserModel.findById(req.userId);
    const role = await RoleModel.find({ _id: { $in: user.role } });
    for (let i = 0; i < role.length; i++) {
        if (role[i].name === "admin") {
            next();
            return;
        }
    }
    return res.status(200).json({ message: "You have be an admin" });
}

module.exports = { verifyToken, isUser, isAdmin }