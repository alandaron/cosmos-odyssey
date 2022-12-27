import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TravelReservation from "../components/TravelReservation";
import TravelSearch from "../components/TravelSearch";

function Home() {
	const { t } = useTranslation();
	const [travelPrices, setTravelPrices] = useState([]);
	const [selectedTravel, setSelectedTravel] = useState([]);

	useEffect(() => {
		fetch("https://cosmos-odyssey-psi.vercel.app/api/travelPrices")
			.then((res) => res.json())
			.then((json) => setTravelPrices(json.legs));
	}, []);

	return (
		<div className="flex gap-10 px-2">
			<div className="w-[35%] mt-5">
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
