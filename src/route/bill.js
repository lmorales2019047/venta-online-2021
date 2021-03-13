const router = require("express").Router();
const billController = require("../controller/billController");

router.get("/all/bill", billController.allBill);
router.post("/add/bill", billController.addBill);
router.put("/update/bill/:idbill", billController.updateBill);
router.delete("/delete/bill/:idbill", billController.deleteBill);

router.get("/bill/mostsold", billController.mostSold);

module.exports = router;