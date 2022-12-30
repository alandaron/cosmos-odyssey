import { useState } from "react";
import SearchReservation from "../components/SearchReservation";
import SearchResult from "../components/SearchResult";

function Reservations() {
	const [reservation, setReservation] = useState(undefined);
	return (
		<div>
			<div className="flex gap-10 px-2">
				<div className="w-[35%] mt-5">
					<SearchReservation setReservation={setReservation} />
				</div>
				<div className="w-[60%]">
					<SearchResult reservation={reservation} />
				</div>
			</div>
		</div>
	);
}

export default Reservations;
