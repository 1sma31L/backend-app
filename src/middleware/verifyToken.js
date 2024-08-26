import jwt from "jsonwebtoken";
import { FAIL } from "../utils/httpStatusText.js";

const verifyToken = (req, res, next) => {
	try {
		const authHeader =
			req.headers["authorization"] || req.headers["Authorization"];
		if (!authHeader) {
			return res.status(401).json({ status: FAIL, message: "Token missing" });
		}
		const token = authHeader.split(" ")[1];
		``;
		if (!token) {
			return res.status(401).send("Token missing");
		}
		const currentuser = jwt.verify(token, process.env.JWT_SECRET);
		req.currentuser = currentuser;

		next();
	} catch (err) {
		res.status(401).json({ status: FAIL, message: "Invalid token" });
	}
};

export default verifyToken;
