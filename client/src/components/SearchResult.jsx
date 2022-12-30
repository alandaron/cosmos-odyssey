import SelectedProviders from "./SelectedProviders";
import Summary from "./Summary";

function SearchResult({ reservation }) {
	return (
		<>
			{reservation !== undefined && (
				<div>
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
