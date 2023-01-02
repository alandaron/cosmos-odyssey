import { useState } from "react";
import SearchReservation from "../components/SearchReservation";
import SearchResult from "../components/SearchResult";

function Reservations() {
	const [reservation, setReservation] = useState(undefined);
	return (
		<div>
			<div className="flex gap-10 px-2">
				<div
					className={
						reservation !== undefined
							? "w-[35%] mt-5 transition-all"
							: "w-[50%] mt-5 mx-auto"
					}
				>
					<SearchReservation setReservation={setReservation} />
				</div>
				{reservation !== undefined && (
					<div className="w-[60%]">
						<SearchResult reservation={reservation} />
					</div>
				)}
			</div>
		</div>
	);
}

export default Reservations;
