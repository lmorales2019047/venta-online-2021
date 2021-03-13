const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const BillSchema = new Schema({
    products: [{
        product: {
            ref: "Product",
            type: Schema.Types.ObjectId
        },
        "amount": "Number"
    }],
    total_price: Number, // Será calculado automáticamente
    client: [{
        ref: "User",
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model("Bill", BillSchema);