const mongoose = require("mongoose");

const TravelPriceSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
	},
	validUntil: {
		type: Date,
		required: true,
	},
	legs: [
		{
			id: {
				type: String,
				required: true,
			},
			routeInfo: {
				id: {
					type: String,
					required: true,
				},
				from: {
					id: {
						type: String,
						required: true,
					},
					name: {
						type: String,
						required: true,
					},
				},
				to: {
					id: {
						type: String,
						required: true,
					},
					name: {
						type: String,
						required: true,
					},
				},
				distance: {
					type: Number,
					required: true,
				},
			},
			providers: [
				{
					id: {
						type: String,
						required: true,
					},
					company: {
						id: {
							type: String,
							required: true,
						},
						name: {
							type: String,
							required: true,
						},
					},
					price: {
						type: Number,
						required: true,
					},
					flightStart: {
						type: Date,
						required: true,
					},
					flightEnd: {
						type: Date,
						required: true,
					},
				},
			],
		},
	],
});

const TravelPrice = mongoose.model("TravelPrice", TravelPriceSchema);

module.exports = TravelPrice;
