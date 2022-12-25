import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TravelReservation from "../components/TravelReservation";
import TravelSearch from "../components/TravelSearch";

function Home() {
	const { t } = useTranslation();
	const [travelPrices, setTravelPrices] = useState([]);
	const [selectedTravel, setSelectedTravel] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3000/api/travelPrices")
			.then((res) => res.json())
			.then((json) => setTravelPrices(json.legs));
	}, []);

	return (
		<div className="flex gap-12 px-2">
			<div className="w-[35%]">
				<TravelSearch
					travelPrices={travelPrices}
					setSelectedTravel={setSelectedTravel}
				/>
			</div>
			<div className="w-[60%]">
				<TravelReservation selectedTravel={selectedTravel} />
			</div>
		</div>
	);
}

export default Home;
