import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import InputDetails from "./InputDetails";
import Providers from "./Providers";
import SelectedProviders from "./SelectedProviders";
import Summary from "./Summary";
import api from "../api.json";

function TravelReservation({
	selectedTravel,
	setSelectedTravel,
	selectedProviders,
	setSelectedProviders,
}) {
	const navigate = useNavigate();
	const [searchInput, setSearchInput] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const saveReservation = (firstName, lastName) => {
		setLoading(true);

		const totalPrice = calculateSum();
		const totalTravelTime = calculateTravelTime();

		const data = {
			firstName:
				firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase(),
			lastName:
				lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase(),
			totalPrice,
			totalTravelTime,
			routes: selectedProviders,
		};

		fetch(api.addReservation, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => {
			setLoading(false);
			if (res.status === 403) {
				res.json().then((json) => setError(json.message));
				return;
			}
			return navigate("/reservations");
		});
	};

	const addProvider = (travel, provider) => {
		const newProvider = { ...travel, providers: [provider] };
		setSelectedProviders([...selectedProviders, newProvider]);
		setSearchInput("");
	};

	const removeProvider = (travel) => {
		const index = selectedProviders.findIndex((e) => e.id === travel.id);
		selectedProviders.splice(index, 1);
		setSelectedProviders([...selectedProviders]);
	};

	const sort = (travel, type) => {
		if (type === "name") {
			travel.providers.sort((a, b) =>
				a.company.name.localeCompare(b.company.name)
			);
			const index = selectedTravel.findIndex((e) => e.id === travel.id);
			selectedTravel[index].providers = travel.providers;
			setSelectedTravel([...selectedTravel]);
		} else if (type === "price") {
			travel.providers.sort((a, b) => a.price - b.price);
			const index = selectedTravel.findIndex((e) => e.id === travel.id);
			selectedTravel[index].providers = travel.providers;
			setSelectedTravel([...selectedTravel]);
		} else if (type === "time") {
			travel.providers.sort((a, b) => {
				const endDateA = new Date(a.flightEnd);
				const startDateA = new Date(a.flightStart);
				const diffA = new Date(endDateA.getTime() - startDateA.getTime());

				const endDateB = new Date(b.flightEnd);
				const startDateB = new Date(b.flightStart);
				const diffB = new Date(endDateB.getTime() - startDateB.getTime());
				return diffA - diffB;
			});
			const index = selectedTravel.findIndex((e) => e.id === travel.id);
			selectedTravel[index].providers = travel.providers;
			setSelectedTravel([...selectedTravel]);
		}
	};

	const filteredTravel = selectedTravel
		.map((travel) => {
			if (selectedProviders.length > 0) {
				return {
					...travel,
					providers: travel.providers.filter((e) => {
						// console.log(e.startFlight);
						return (
							selectedProviders[selectedProviders.length - 1].providers[0]
								.flightEnd < e.flightStart
						);
					}),
				};
			}

			return { ...travel };
		})
		.filter((_, index) => index === selectedProviders.length);

	const calculateSum = () => {
		let total = 0;
		for (let index = 0; index < selectedProviders.length; index++) {
			total += selectedProviders[index].providers[0].price;
		}
		return total;
	};

	const calculateTravelTime = () => {
		const endDate = new Date(
			selectedProviders[selectedProviders.length - 1].providers[0].flightEnd
		);
		const startDate = new Date(selectedProviders[0].providers[0].flightStart);
		const diff = new Date(endDate.getTime() - startDate.getTime());
		const years = diff.getUTCFullYear() - 1970;
		const months = diff.getUTCMonth();
		const days = diff.getUTCDate() - 1;
		const hours = diff.getUTCHours();
		const minutes = diff.getUTCMinutes();

		return { years, months, days, hours, minutes };
	};

	return (
		<>
			<div className="font-semibold text-xl text-center">
				Vali teenusepakkujad
			</div>

			{selectedTravel.length < 1 && (
				<div>Lähtekohta ja sihtkohta ei ole valitud.</div>
			)}

			{selectedTravel.length > 0 && (
				<div>
					<SelectedProviders
						selectedProviders={selectedProviders}
						removeProvider={removeProvider}
					/>
					<Providers
						travels={filteredTravel}
						searchInput={searchInput}
						setSearchInput={setSearchInput}
						sort={sort}
						addProvider={addProvider}
					/>
				</div>
			)}

			{selectedTravel.length > 0 &&
				selectedTravel.length === selectedProviders.length && (
					<div>
						<Summary
							data={{
								totalTravelTime: calculateTravelTime(),
								totalPrice: calculateSum().toFixed(2),
							}}
						/>
						<InputDetails loading={loading} saveReservation={saveReservation} />

						{error !== "" && <div className="text-red-800">{error}</div>}
					</div>
				)}
		</>
	);
}

export default TravelReservation;
