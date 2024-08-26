import express from "express";
import validationShema from "../middleware/validationShema.js";
import {
	getCourses,
	getCourse,
	createCourse,
	updateCourse,
	deleteCourse,
} from "../controllers/courses.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import userRoles from "../utils/roles.js";
import allowedTo from "../middleware/allowedTo.js";

const router = express.Router();
router
	.route("/")
	.get(getCourses)
	.post(
		validationShema(),
		verifyToken,
		allowedTo(userRoles.MANAGER, userRoles.ADMIN),
		createCourse
	);

router
	.route("/:courseID")
	.get(getCourse)
	.patch(
		verifyToken,
		allowedTo(userRoles.MANAGER, userRoles.ADMIN),
		updateCourse
	)
	.delete(
		verifyToken,
		allowedTo(userRoles.MANAGER, userRoles.ADMIN),
		deleteCourse
	);

export default router;
