const productModel = require("../model/Product")

async function allProduct(req, res) {
    await productModel.find().populate("category")
        .then(doc => res.json(doc))
        .catch(err => console.error(err));
}

async function addProduct(req, res) {
    const { name, stock, price, category } = req.body;

    if (stock < 0) return res.json({ error: "Stock cannot be smaller than 0" })

    const newProduct = new productModel({ name, stock, price, category });
    await newProduct.save()
        .then(doc => res.json(doc))
        .catch(err => console.error(err));
}

async function updateProduct(req, res) {
    const idproduct = req.params.idproduct;
    const { name, stock, price, category } = req.body;

    if (stock < 0) return res.json({ error: "Stock cannot be smaller than 0" })

    await productModel.findByIdAndUpdate(idproduct, { name, stock, price, category })
        .then(doc => res.json({ doc, updated: true }))
        .catch(err => console.error(err));
}

async function deleteProduct(req, res) {
    const idproduct = req.params.idproduct;
    await productModel.findByIdAndDelete(idproduct)
        .then(doc => res.json({ doc, deleted: true }))
        .catch(err => console.error(err));
}

async function soldOutProduct(req, res) {
    const products = await productModel.find({ stock: 0 }, { category: 0 });
    if (products.length === 0) {
        return res.json({ message: "There are not sold-out products" })
    } else {
        res.json(products);
    }
}

module.exports = { allProduct, addProduct, updateProduct, deleteProduct, soldOutProduct }