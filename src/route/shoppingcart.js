const router = require("express").Router();
const shoppingcartController = require("../controller/shoppingcartController");

router.get("/all/shoppingcart", shoppingcartController.allShoppingController);
router.post("/add/shoppingcart", shoppingcartController.addShoppingController);
router.put("/update/shoppingcart/:idshoppingcart", shoppingcartController.updateShoppingController);
router.delete("/delete/shoppingcart/:idshoppingcart", shoppingcartController.deleteShoppingController);

router.put("/shoppingcart/addproducttoshoppingcart/:idclient", shoppingcartController.addProductToShoppingCart);
router.post("/shoppingcart/confirmpurchase/:idclient",shoppingcartController.confirmPurchase);
router.post("/shoppingcart/checkin/:idclient",shoppingcartController.checkIn);

module.exports = router