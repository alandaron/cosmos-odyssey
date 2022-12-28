import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TravelReservation from "../components/TravelReservation";
import TravelSearch from "../components/TravelSearch";

function Home() {
	const { t } = useTranslation();
	const [travelPrices, setTravelPrices] = useState([]);
	const [selectedTravel, setSelectedTravel] = useState([]);
	const [selectedProviders, setSelectedProviders] = useState([]);
	const [validUntil, setValidUntil] = useState("");

	const dateOptions = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	};

	useEffect(() => {
		fetch("http://localhost:3000/api/travelPrices")
			.then((res) => res.json())
			.then((json) => {
				setValidUntil(json.validUntil);
				setTravelPrices(json.legs);
			});
	}, []);

	return (
		<div className="flex gap-10 px-2">
			<div className="w-[35%] mt-5">
				<TravelSearch
					travelPrices={travelPrices}
					setSelectedTravel={setSelectedTravel}
					setSelectedProviders={setSelectedProviders}
				/>
			</div>
			<div className="w-[60%]">
				{validUntil !== "" && (
					<div>
						Hinnakiri aegub:{" "}
						{new Date(validUntil).toLocaleString(undefined, dateOptions)}
					</div>
				)}
				<TravelReservation
					selectedTravel={selectedTravel}
					setSelectedTravel={setSelectedTravel}
					selectedProviders={selectedProviders}
					setSelectedProviders={setSelectedProviders}
				/>
			</div>
		</div>
	);
}

export default Home;
