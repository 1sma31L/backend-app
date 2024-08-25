import mongoose from "mongoose";
import validator from "validator";
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
});
export default mongoose.model("User", userShema);
