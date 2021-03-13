const categoryModel = require("../model/Category.js");
const productModel = require("../model/Product");

async function allCategory(req, res) {
    await categoryModel.find()
        .then(doc => res.json(doc))
        .catch(err => console.error(err));
}

async function addCategory(req, res) {
    const { name, description } = req.body;
    const newCategory = new categoryModel({ name, description });
    await newCategory.save()
        .then(doc => res.json(doc))
        .catch(err => console.error(err));
}

async function updateCategory(req, res) {
    const idcategory = req.params.idcategory;
    const { name, description } = req.body;
    await categoryModel.findByIdAndUpdate(idcategory, { name, description })
        .then(doc => res.json({ doc, updated: true }))
        .catch(err => console.error(err));
}

async function deleteCategory(req, res) {
    const idcategory = req.params.idcategory;
    const categoryIsUsed = await productModel.find({ category: { $in: [idcategory] } });
    const idDefault = await categoryModel.find({ name: { $in: ["default"] } });

    if (categoryIsUsed.length === 0) {
        await categoryModel.findByIdAndDelete(idcategory)
            .then(doc => res.json({ doc, deleted: true }))
            .catch(err => console.error(err));
    } else {
        await productModel.findByIdAndUpdate(categoryIsUsed[0]._id, { category: [idDefault[0]._id] });
        await categoryModel.findByIdAndDelete(idcategory)
            .then(doc => res.json({ doc, deleted: true }))
            .catch(err => console.error(err));
    }
}

module.exports = { allCategory, addCategory, updateCategory, deleteCategory }