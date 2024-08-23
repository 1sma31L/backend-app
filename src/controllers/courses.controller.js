import { FAIL, SUCCESS } from "../../utils/httpStatusText.js";
import asyncWrapper from "../middleware/asyncWrapper.js";
import Course from "../models/course.model.js";
import { validationResult } from "express-validator";
import AppError from "../../utils/appError.js";

const getCourses = asyncWrapper(async (req, res) => {
	const page = req.query.page || 1;
	const limit = req.query.limit || 3;
	const skip = (page - 1) * limit;
	const courses = await Course.find({}, { __v: 0 }).limit(limit).skip(skip);
	res.json({ status: "success", data: { courses } });
});

const getCourse = asyncWrapper(async (req, res, next) => {
	const course = await Course.findById(req.params.courseID);
	if (!course) {
		const error = AppError.create("Course not found", 404, FAIL);
		return next(error);
	}
	return res.json({ status: SUCCESS, data: { course } });
});

const createCourse = asyncWrapper(async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = AppError.create(errors.array(), 400, FAIL);
		return next(error);
	}
	const newCourse = new Course(req.body);
	await newCourse.save();
	res.status(201).json({ status: "success", data: { course: newCourse } });
});

const updateCourse = asyncWrapper(async (req, res, next) => {
	const courseID = req.params.courseID;
	const updatedCourse = await Course.updateOne(
		{ _id: courseID },
		{
			$set: { ...req.body },
		}
	);
	if (!updatedCourse.matchedCount) {
		const error = AppError.create("Course not found", 404, FAIL);
		return next(error);
	}
	res.status(201).json({ status: "success", data: { course: updatedCourse } });
});

const deleteCourse = asyncWrapper(async (req, res, next) => {
	const courseID = req.params.courseID;
	const deletedCourse = await Course.deleteOne({ _id: courseID });
	if (!deletedCourse.deletedCount) {
		const error = AppError.create("Course not found", 404, FAIL);
		return next(error);
	}
	res.status(204).json({ status: "success", data: null });
});

export { getCourses, getCourse, createCourse, updateCourse, deleteCourse };
