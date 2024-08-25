import express from "express";
import * as usersController from "../controllers/users.controller.js";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();

router.route("/").get(verifyToken, usersController.getAllUsers);
router.route("/register").post(usersController.register);
router.route("/login").post(usersController.login);

export default router;
