import SelectedProviders from "./SelectedProviders";
import Summary from "./Summary";

function SearchResult({ reservation }) {
	return (
		<>
			{reservation !== undefined && (
				<div>
					<div className="font-semibold text-xl text-center uppercase">
						{reservation.firstName} {reservation.lastName} broneering
					</div>
					<SelectedProviders
						viewOnly={true}
						selectedProviders={reservation.routes}
					/>
					<Summary data={reservation} />
				</div>
			)}
		</>
	);
}

export default SearchResult;
