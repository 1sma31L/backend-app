import mongoose from "mongoose";
import validator from "validator";
import userRoles from "../utils/roles.js";

const userShema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		trim: true,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: [validator.isEmail, "Invalid email"],
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 8,
	},
	token: {
		type: String,
	},
	role: {
		type: String,
		enum: [userRoles.USER, userRoles.ADMIN, userRoles.MANAGER],
		default: userRoles.USER,
	},
	avatar: {
		type: String,
		default: "L.jpeg",
	},
});
export default mongoose.model("User", userShema);
