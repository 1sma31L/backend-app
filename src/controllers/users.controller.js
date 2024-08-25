import { SUCCESS, FAIL } from "../utils/httpStatusText.js";
import User from "../models/user.model.js";
import asyncWrapper from "../middleware/asyncWrapper.js";
import appError from "../utils/appError.js";
import bcrypt from "bcryptjs";
import generateJWT from "../utils/generateJWT.js";

const getAllUsers = asyncWrapper(async (req, res, next) => {
	const page = req.query.page || 1;
	const limit = req.query.limit || 4;
	const skip = (page - 1) * limit;
	const users = await User.find(
		{},
		{ __v: false, password: false, token: false }
	)
		.limit(limit)
		.skip(skip);
	res.json({ status: SUCCESS, data: { users } });
});

const register = asyncWrapper(async (req, res, next) => {
	const { firstName, lastName, email, password } = req.body;
	if (await User.findOne({ email: email })) {
		const error = appError.create("User already exists", 400, FAIL);
		return next(error);
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = await User.create({
		firstName,
		lastName,
		email,
		password: hashedPassword,
	});

	const token = await generateJWT({ email: newUser.email, id: newUser._id });
	newUser.token = token;

	await newUser.save();
	res.status(201).json({ status: SUCCESS, data: { newUser } });
});

const login = asyncWrapper(async (req, res, next) => {
	const { email, password } = req.body;
	if (!email && !password) {
		const error = appError.create(
			"Please provide email and password",
			400,
			FAIL
		);
		return next(error);
	}
	const user = await User.findOne({ email: email });
	const isMatch = user ? await bcrypt.compare(password, user.password) : false;
	if (user && isMatch) {
		const token = await generateJWT({ email: user.email, id: user._id });
		return res
			.status(200)
			.json({ status: SUCCESS, data: "Logged in successfully", token: token });
	} else {
		const error = appError.create("Invalid credentials", 401, FAIL);
		return next(error);
	}
});

export { getAllUsers, register, login };
