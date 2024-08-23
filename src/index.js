import express from "express";
import courseRouter from "./routes/courses.route.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MONGODB_URI;

mongoose.connect(URI).then(() => {
	console.log("Connected to MongoDB");
});

const app = express();
const port = 3000;

app.use([express.json()]);
app.use("/api/courses", courseRouter);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
