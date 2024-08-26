import express from "express";
import * as usersController from "../controllers/users.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import multer from "multer";
import appError from "../utils/appError.js";
import allowedTo from "../middleware/allowedTo.js";
import userRoles from "../utils/roles.js";
const router = express.Router();

const diskStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		console.log("file : ", file);
		cb(null, "uploads");
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const upload = multer({
	storage: diskStorage,
	fileFilter: (req, file, cb) => {
		if (file.mimetype.startsWith("image")) {
			cb(null, true);
		} else {
			cb(appError.create("This file type is not an image", 400), false);
		}
	},
});

router
	.route("/")
	.get(verifyToken, allowedTo(userRoles.ADMIN), usersController.getAllUsers);
router
	.route("/register")
	.post(upload.single("avatar"), usersController.register);
router.route("/login").post(usersController.login);

export default router;
