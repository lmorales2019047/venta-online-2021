const userController = require("../controller/userController");
const router = require("express").Router();

router.get("/all/user", userController.allUser);
router.put("/update/user/:iduser", userController.updateUser);
router.delete("/delete/user/:iduser", userController.deleteUser);

module.exports = router;