import express from "express";
import validationShema from "../middleware/validationShema.js";
import {
	getCourses,
	getCourse,
	createCourse,
	updateCourse,
	deleteCourse,
} from "../controllers/courses.controller.js";

const router = express.Router();
router.route("/").get(getCourses).post(validationShema(), createCourse);

router
	.route("/:courseID")
	.get(getCourse)
	.patch(updateCourse)
	.delete(deleteCourse);

export default router;
