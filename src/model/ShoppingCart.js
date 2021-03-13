const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const ShoppingCartSchema = new Schema({
    products: [{
        product: {
            ref: "Product",
            type: Schema.Types.ObjectId
        },
        "amount": "Number"
    }],
    total_price: Number, // Será calculado automáticamente
    client: {
        ref: "User",
        unique: true,
        type: Schema.Types.ObjectId
    },
    done: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model("ShoppingCart", ShoppingCartSchema);