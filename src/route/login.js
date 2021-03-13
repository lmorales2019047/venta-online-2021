const router = require("express").Router();
const loginController = require("../controller/loginController");

router.post("/signin", loginController.signIn);
router.post("/signup", loginController.signUp);

module.exports = router;