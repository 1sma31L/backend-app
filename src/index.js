import express from "express";
import courseRouter from "./routes/courses.route.js";
import userRouter from "./routes/users.route.js";
import mongoose from "mongoose";
import cors from "cors";
import { ERROR, SUCCESS, FAIL } from "./utils/httpStatusText.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const app = express();
const port = 3000;
const URI = process.env.MONGODB_URI;
mongoose.connect(URI).then(() => {
	console.log("Connected to MongoDB");
});

// Serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(cors());
app.use([express.json()]);
app.use("/api/courses", courseRouter);
app.use("/api/users", userRouter);

app.all("*", (req, res) => {
	res.status(404).json({
		status: "fail",
		message: "Resource not found",
	});
});

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
