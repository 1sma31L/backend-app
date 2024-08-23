import express from "express";
import courseRouter from "./routes/courses.route.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { ERROR, SUCCESS, FAIL } from "../utils/httpStatusText.js";
dotenv.config();

const URI = process.env.MONGODB_URI;
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(URI).then(() => {
	console.log("Connected to MongoDB");
});

app.use(cors());
app.use([express.json()]);
app.use("/api/courses", courseRouter);

// 404 route handler
app.all("*", (req, res) => {
	res.status(404).json({
		status: "fail",
		message: "Resource not found",
	});
});

// Global error handler
app.use((err, req, res, next) => {
	res.status(err.statusCode || 500).json({
		status: err.statusText || ERROR,
		message: err.message || "Internal server error",
		code: err.statusCode || 500,
		data: null,
	});
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
