const express=require("express");
const router = express.Router();
const controle=require('../controllers/medecinController');

router.route("/getAll").get(controle.getAll);
router.route("/get/:id").get(controle.get);
router.route("/new").post(controle.create_new);
router.route("/update/:id").put(controle.update);
router.route("/remove/:id").delete(controle.del);
router.route("/search/:rech").get(controle.search);
router.route("/test").get(controle.suggest);

module.exports=router;
