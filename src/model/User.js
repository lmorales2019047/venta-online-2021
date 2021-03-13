const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const UserSchema = new Schema({
    user: {
        type: String,
        unique: true
    },
    pwd: String,
    role: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
});

UserSchema.statics.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

UserSchema.statics.comparePassword = async(password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

module.exports = mongoose.model("User", UserSchema)