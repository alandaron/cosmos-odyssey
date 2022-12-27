const express = require("express");

const app = express();

const cors = require("cors");

const routes = require("./routes/routes");

app.use(
	cors({
		origin: "https://cosmos-odyssey-react.vercel.app",
	})
);

app.use("/api", routes);

app.use(express.json());

app.listen(3000, () => {
	console.log(`Server Started at ${3000}`);
});
