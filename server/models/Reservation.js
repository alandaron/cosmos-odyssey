const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	totalPrice: {
		type: Number,
		required: true,
	},
	travelPriceId: {
		type: String,
		required: true,
	},
	totalTravelTime: {
		years: {
			type: Number,
			required: true,
		},
		months: {
			type: Number,
			required: true,
		},
		days: {
			type: Number,
			required: true,
		},
		hours: {
			type: Number,
			required: true,
		},
		minutes: {
			type: Number,
			required: true,
		},
	},
	routes: [
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

const Reservation = mongoose.model("Reservation", ReservationSchema);

module.exports = Reservation;
