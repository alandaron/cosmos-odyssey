const express = require("express");

const app = express();

const cors = require("cors");

const routes = require("./routes/routes");

app.use(
	cors({
		origin: "http://localhost:5173",
	})
);

app.use("/api", routes);

app.use(express.json());

app.listen(3000, () => {
	console.log(`Server Started at ${3000}`);
});
