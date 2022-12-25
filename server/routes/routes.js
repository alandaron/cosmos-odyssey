const { default: axios } = require("axios");
const express = require("express");

const router = express.Router();

//Post Method
router.post("/post", (req, res) => {
	res.send("Post API");
});

//Get all Method
router.get("/travelPrices", async (req, res) => {
	try {
		const response = await axios.get(
			"https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices"
		);

		res.json(response.data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Get by ID Method
router.get("/getOne/:id", (req, res) => {
	res.send("Get by ID API");
});

//Update by ID Method
router.patch("/update/:id", (req, res) => {
	res.send("Update by ID API");
});

//Delete by ID Method
router.delete("/delete/:id", (req, res) => {
	res.send("Delete by ID API");
});

module.exports = router;
