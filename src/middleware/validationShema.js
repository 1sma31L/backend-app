import { body } from "express-validator";
const validationShema = () => {
	return [
		body("title")
			.notEmpty()
			.withMessage("Title is required")
			.isLength({ min: 2 })
			.withMessage("Length is too short"),
		body("price")
			.notEmpty()
			.withMessage("Price is required")
			.isNumeric()
			.withMessage("Price must be Numeric"),
	];
};
export default validationShema;
