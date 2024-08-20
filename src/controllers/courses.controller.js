import Course from "../models/course.model.js";
import { validationResult } from "express-validator";

async function getCourses(req, res) {
	const courses = await Course.find();
	res.json(courses);
}

async function getCourse(req, res) {
	try {
		const course = await Course.findById(req.params.courseID);
		if (!course) {
			return res.status(404).json({ message: "Course not found", status: 404 });
		}
		return res.json(course);
	} catch (error) {
		return res.status(404).json({ message: "Course not found", status: 404 });
	}
}

function createCourse(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const newCourse = new Course(req.body);
	newCourse.save();
	res.status(201).json(newCourse);
}

async function updateCourse(req, res) {
	try {
		const courseID = req.params.courseID;
		const updatedCourse = await Course.updateOne(
			{ _id: courseID },
			{
				$set: { ...req.body },
			}
		);
		if (!updatedCourse.matchedCount) {
			return res.status(404).json({ message: "Course not found", status: 404 });
		}
		res.status(201).json(await Course.findById(courseID));
	} catch (error) {
		res.status(404).json({ message: "Course not found", status: 404 });
	}
}

async function deleteCourse(req, res) {
	try {
		const courseID = req.params.courseID;
		const deletedCourse = await Course.deleteOne({ _id: courseID });
		console.log(deletedCourse);
		if (!deletedCourse.deletedCount) {
			return res.status(404).json({ message: "Course not found", status: 404 });
		}
		res.status(204).json();
	} catch (error) {
		res.status(404).json({ message: "Course not found", status: 404 });
	}
}

export { getCourses, getCourse, createCourse, updateCourse, deleteCourse };
