const shoppingCartModel = require("../model/ShoppingCart");
const billModel = require("../model/Bill");
const productModel = require("../model/Product");

async function allShoppingController(req, res) {
    shoppingCartModel.find().populate({
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
        .then(doc => res.send(doc))
        .catch(err => console.error(err));
};

async function addShoppingController(req, res) {
    const {
        products, //Un array profe
        client
    } = req.body;

    var totalpricevar = 0;

    for (let i = 0; i < products.length; i++) {
        const productbyid = await productModel.findOne({ _id: products[i].product });
        if (products[i].amount > productbyid.stock) {
            return res.json({ error: "The amount is bigger than the stock", product: productbyid.name });
        }
        totalpricevar += Number(products[i].amount * productbyid.price);
    }

    const newShoppingCart = new shoppingCartModel({ products, total_price: totalpricevar, client, done: false })
    await newShoppingCart.save()
        .then(doc => res.send(doc))
        .catch(err => console.error(err));
};

async function updateShoppingController(req, res) {
    const idshoppingcart = req.params.idshoppingcart;
    const {
        products,
        client
    } = req.body;


    var totalpricevar = 0;

    for (let i = 0; i < products.length; i++) {
        const productbyid = await productModel.findOne({ _id: products[i].product });
        if (products[i].amount > productbyid.stock) {
            return res.json({ error: "The amount is bigger than the stock", product: productbyid.name });
        }
        totalpricevar += Number(products[i].amount * productbyid.price);
    }

    await shoppingCartModel.findByIdAndUpdate(idshoppingcart, { products, total_price: totalpricevar, client, done: false })
        .then(doc => res.send(doc))
        .catch(err => console.error(err))
};

async function deleteShoppingController(req, res) {
    const idshoppingcart = req.params.idshoppingcart;
    await shoppingCartModel.findByIdAndDelete(idshoppingcart)
        .then(doc => res.send(doc))
        .catch(err => console.error(err))
};

async function addProductToShoppingCart(req, res) {
    const idclient = req.params.idclient;
    const { products } = req.body;

    const myshoppingcart = await shoppingCartModel.findOne({ client: idclient });
    if (!myshoppingcart) return res.json({ error: "You do not have a shopping cart" })
    const idshoppingcart = myshoppingcart._id;

    if (myshoppingcart.done === true) return res.json({ error: "Your purchase was confirmed before, in order to use the cart again, please unconfirm the purchase (solo dele en confirmpurchase otra vez profe es como un toggle)" })

    var totalpricevarthisproducts = 0;

    for (let i = 0; i < products.length; i++) {
        const productbyid = await productModel.findOne({ _id: products[i].product });
        if (products[i].amount > productbyid.stock) {
            return res.json({ error: "The amount is bigger than the stock", product: productbyid.name });
        }
        totalpricevarthisproducts += Number(products[i].amount * productbyid.price);
    }

    var totalpricevar = totalpricevarthisproducts + myshoppingcart.total_price;
    await shoppingCartModel.findByIdAndUpdate(idshoppingcart, { $push: { products }, total_price: totalpricevar })
        .then(doc => res.send(doc))
        .catch(err => console.error(err))
}

async function checkIn(req, res) {
    const idclient = req.params.idclient;

    const myshoppingcart = await shoppingCartModel.findOne({ client: idclient });
    if (!myshoppingcart) return res.json({ error: "You do not have a shopping cart" });
    const idshoppingcart = myshoppingcart._id;
    const { client, products, total_price } = myshoppingcart;

    if (myshoppingcart.done === false) return res.json({ error: "You have to confirm your purchase(use confirmpurchase profe)" })

    for (let i = 0; i < products.length; i++) {
        const productbyid = await productModel.findOne({ _id: products[i].product });

        const newStock = productbyid.stock - products[i].amount;
        await productModel.findByIdAndUpdate(products[i].product, { stock: newStock })
    }
    const newBill = new billModel({ client, products, total_price });
    await shoppingCartModel.findByIdAndDelete(idshoppingcart)

    await newBill.save()
        .then(doc => res.json({ "You can see your bill with this ID!: ": doc._id }))
        .catch(err => console.error(err))
}

async function confirmPurchase(req, res) {
    const idclient = req.params.idclient;

    const myshoppingcart = await shoppingCartModel.findOne({ client: idclient });
    if (!myshoppingcart) return res.json({ error: "You do not have a shopping cart" });
    const idshoppingcart = myshoppingcart._id;

    if (myshoppingcart.done === false) {
        await shoppingCartModel.findByIdAndUpdate(idshoppingcart, { done: true })
            .then(doc => res.json({ message: "You purchase was confirmed successfully" }))
            .catch(err => console.error(err));
    } else {
        await shoppingCartModel.findByIdAndUpdate(idshoppingcart, { done: false })
            .then(doc => res.json({ message: "You reactivated your shopping cart" }))
            .catch(err => console.error(err));
    }
}

module.exports = {
    allShoppingController,
    addShoppingController,
    updateShoppingController,
    deleteShoppingController,
    addProductToShoppingCart,
    confirmPurchase,
    checkIn
}