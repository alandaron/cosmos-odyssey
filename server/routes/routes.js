const { default: axios } = require("axios");
const express = require("express");

const router = express.Router();

//Post Method
router.post("/reservations", (req, res) => {
	res.send("Reservations Post API");
});

const TravelPrice = require("../models/TravelPrice");

let validUntil = 0;
//Get all Method
router.get("/travelPrices", async (req, res) => {
	/**
	 *
	 * Peaks kontrollima, kas viimane hinnakiri on aegunud. Kui jah, teha uus päring ning hinnakiri salvestada ajalukku.
	 * Kui ajaloos on juba 15 hinnakirja salvestatud, eemalda kõige esimene hinnakiri ning see järel kõik reserveeringud, mis
	 * on seotud selle hinnakirjaga.
	 *
	 */

	if (validUntil < new Date().getUTCDate()) {
		try {
			const response = await axios.get(
				"https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices"
			);

			const newTravelPrice = new TravelPrice({ ...response.data });
			const insertedTravelPrice = await newTravelPrice.save();
			validUntil = insertedTravelPrice.validUntil;
			TravelPrice.count({}, async (err, count) => {
				if (count >= 8) {
					const oldestTravelPrice = await TravelPrice.find()
						.sort({ createdAt: 1 })
						.limit(11);
					await TravelPrice.deleteOne(oldestTravelPrice[0]);
					/* TODO: Kustutada ka kõik reservatsioonid mis on seotud kõige vanema hinnakirjaga  */
					res.json(insertedTravelPrice);
				} else {
					res.json(insertedTravelPrice);
				}
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	} else {
		const travelPrices = await TravelPrice.find().sort({ _id: -1 }).limit(1);
		res.json(travelPrices[0]);
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
