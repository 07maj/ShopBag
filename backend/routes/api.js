const apiRoutes = require("express").Router();
const userController = require("../controller/user");
const adminController = require("../controller/admin");
const upload = require("../middleware/multer");
const { auth } = require("../middleware/auth");


apiRoutes.get("/", (req, res) => {
  res.send("you are on backend");
});

apiRoutes.post("/regdata", userController.regDataController);
apiRoutes.post("/logindata", userController.loginDataController);
apiRoutes.post(
  "/addproduct",
  upload.single("image"),
  adminController.productController,
);
apiRoutes.get("/getproducts", adminController.allProductsController);
apiRoutes.delete(
  "/productdelete/:abc",
  adminController.deleteProductController,
);
apiRoutes.get("/updateproduct/:abc", adminController.updateProductController);
apiRoutes.post("/updateddata/:abc", adminController.updatedDataController);
apiRoutes.get("/userproducts", userController.productDataController);
apiRoutes.post("/userquery", userController.userQueryController);
apiRoutes.get("/getquery", adminController.getQueryController);
apiRoutes.delete("/deletequery/:abc", adminController.deleteQueryController);
apiRoutes.get("/userqueryreply/:abc", adminController.userQueryReplyController);
apiRoutes.post("/mailreply/:abc", adminController.userQueryMailReplyController);
apiRoutes.post("/cart/data", auth, userController.saveCartDataController);
apiRoutes.get("/search", userController.searchController);
apiRoutes.get("/cart/:id", auth, userController.fetchCartController);
apiRoutes.post("/cart-order", userController.cartOrderController);
apiRoutes.post("/verify", userController.verifyOrderController);
apiRoutes.post("/admin/Reg", adminController.adminRegDataController);
apiRoutes.post("/admin/logindata", adminController.adminLoginDataController);

module.exports = apiRoutes;
