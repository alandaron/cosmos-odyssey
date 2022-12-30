const { default: axios } = require("axios");
const express = require("express");

const router = express.Router();

const TravelPrice = require("../models/TravelPrice");
const Reservation = require("../models/Reservation");

let validUntil = 0;

//Post Method
router.post("/addReservation", async (req, res) => {
	if (validUntil < new Date()) {
		res.status(403).json({ message: "Hinnakiri on aegunud!" });
	} else {
		const latestTravelPrice = await TravelPrice.find()
			.sort({ _id: -1 })
			.limit(1);
		const newReservation = new Reservation({
			...req.body,
			travelPriceId: latestTravelPrice[0].id,
		});
		const insertedReservation = await newReservation.save();
		return res.status(201).json(insertedReservation);
	}
});

router.post("/searchReservations", async (req, res) => {
	const reservations = await Reservation.find({
		...req.body,
	});
	return res.status(201).json(reservations);
});

//Get all Method
router.get("/travelPrices", async (req, res) => {
	/**
	 *
	 * Peaks kontrollima, kas viimane hinnakiri on aegunud. Kui jah, teha uus päring ning hinnakiri salvestada ajalukku.
	 * Kui ajaloos on juba 15 hinnakirja salvestatud, eemalda kõige esimene hinnakiri ning see järel kõik reserveeringud, mis
	 * on seotud selle hinnakirjaga.
	 *
	 */

	if (validUntil < new Date()) {
		try {
			const response = await axios.get(
				"https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices"
			);

			const newTravelPrice = new TravelPrice({ ...response.data });
			const insertedTravelPrice = await newTravelPrice.save();
			validUntil = insertedTravelPrice.validUntil;
			TravelPrice.count({}, async (err, count) => {
				if (count >= 15) {
					const oldestTravelPrice = await TravelPrice.find()
						.sort({ createdAt: 1 })
						.limit(1);

					await Reservation.deleteMany({
						travelPriceId: oldestTravelPrice[0].id,
					});
					await TravelPrice.deleteOne(oldestTravelPrice[0]);

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

module.exports = router;
