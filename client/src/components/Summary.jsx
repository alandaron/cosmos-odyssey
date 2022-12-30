function Summary({ data }) {
	return (
		<div className="flex flex-row justify-between">
			<div className="font-semibold text-xl">
				<span>Reisiaeg: </span>

				{data.totalTravelTime.years > 0 && (
					<span>{data.totalTravelTime.years} aastat </span>
				)}

				{data.totalTravelTime.months > 0 && (
					<span>{data.totalTravelTime.months} kuud </span>
				)}

				{data.totalTravelTime.days > 0 && (
					<span>{data.totalTravelTime.days} päeva </span>
				)}

				{data.totalTravelTime.hours > 0 && (
					<span>{data.totalTravelTime.hours} tundi </span>
				)}

				{data.totalTravelTime.minutes > 0 && (
					<span>{data.totalTravelTime.minutes} minutit </span>
				)}
			</div>

			<div className="font-semibold text-xl">
				Hind kokku: {data.totalPrice} €
			</div>
		</div>
	);
}

export default Summary;
