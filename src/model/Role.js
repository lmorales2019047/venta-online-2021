const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const RoleSchema = new Schema({
    name: {
        type: String,
        unique: true
    }
});

module.exports = mongoose.model("Role", RoleSchema)