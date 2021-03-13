const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const CategorySchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    description: String
});

module.exports = mongoose.model("Category", CategorySchema);