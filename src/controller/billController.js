const billModel = require("../model/Bill");

async function allBill(req, res) {
    await billModel.find().populate({
            path: "client",
            populate: {
                path: "role",
                model: "Role"
            }
        }).populate({
            path: "products",
            populate: {
                path: "product",
                model: "Product",
                populate: {
                    path: "category",
                    model: "Category"
                }
            }
        })
        .then(doc => res.json(doc))
        .catch(err => console.error(err));
}

async function addBill(req, res) {
    const { name, amount, price, client, done } = req.body;
    var precio_total = 15;
    const newBill = new billModel({
        products: [{
            name,
            amount,
            price,
        }],
        total_price: precio_total,
        client
    });
    await newBill.save()
        .then(doc => res.json(doc))
        .catch(err => console.error(err))
}

async function updateBill(req, res) {
    const idbill = req.params.idbill;
    const { name, amount, price, client, done } = req.body;
    await billModel.findByIdAndUpdate(idbill, { name, amount, price, client, done })
        .then(doc => res.json({ doc, updated: true }))
        .catch(err => console.error(err));
}

async function deleteBill(req, res) {
    const idbill = req.params.idbill;
    const { name, amount, price, client, done } = req.body;
    await billModel.findByIdAndDelete(idbill)
        .then(doc => res.json({ doc, deleted: true }))
        .catch(err => console.error(err));
}

async function mostSold(req, res) {
    const productsfrombill = await billModel.find();

    var allproducts = [];
    var count = 0;
    for (let i = 0; i < productsfrombill.length; i++) {
        for (let x = 0; x < productsfrombill[i].products.length; x++) {
            allproducts[count] = productsfrombill[i].products[x].product
            count = count + 1;
        }
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    var u = allproducts.filter(onlyUnique)
    res.json(u);

    /*var elarray = array.filter(onlyUnique);
    console.log(elarray);*/
}
module.exports = { allBill, addBill, updateBill, deleteBill, mostSold }