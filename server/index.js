const express = require("express");
const mongoose = require("mongoose");

const app = express();

const cors = require("cors");

const routes = require("./routes/routes");

// user: cosmos, pass: LfqZpAN3JhO5KlA9

app.use(
	cors({
		origin: [
			"http://localhost:5173",
			"https://cosmos-odyssey-react.vercel.app",
		],
	})
);

app.use(express.json());

app.use("/api", routes);

const start = async () => {
	try {
		await mongoose.connect(
			"mongodb+srv://cosmos:LfqZpAN3JhO5KlA9@cosmos-odyssey.dfn1akq.mongodb.net/?retryWrites=true&w=majority",
			{ useNewUrlParser: true }
		);
		app.listen(3000, () => {
			console.log(`Server Started at ${3000}`);
		});
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

start();
