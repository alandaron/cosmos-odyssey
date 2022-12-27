import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function TravelReservation({ selectedTravel }) {
	const { t } = useTranslation();
	const [selectedProviders, setSelectedProviders] = useState([]);
	const dateOptions = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	};

	useEffect(() => {
		setSelectedProviders([]);
	}, [selectedTravel]);

	const addProvider = (travel, provider) => {
		const newProvider = { ...travel, providers: [provider] };
		setSelectedProviders([...selectedProviders, newProvider]);
	};

	const removeProvider = (travel) => {
		const index = selectedProviders.findIndex((e) => e.id === travel.id);
		selectedProviders.splice(index, 1);
		setSelectedProviders([...selectedProviders]);
	};

	const filteredTravel = selectedTravel.map((travel) => {
		console.log(selectedProviders);
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
	});

	return (
		<>
			{selectedTravel.length > 0 && (
				<div>
					{selectedProviders.map((travel, index) => (
						<div key={travel.id}>
							<div className="text-lg font-bold">
								{t(travel.routeInfo.from.name)} - {t(travel.routeInfo.to.name)}
							</div>
							<div>
								{travel.providers.map((provider) => (
									<div key={provider.id} className="border-b-2 mb-2">
										<div>
											Algus:{" "}
											{new Date(provider.flightStart).toLocaleString(
												undefined,
												dateOptions
											)}
										</div>
										<div>
											Lõpp:{" "}
											{new Date(provider.flightEnd).toLocaleString(
												undefined,
												dateOptions
											)}
										</div>
										<div>Hind: {provider.price} €</div>
										<div>Pakkuja: {provider.company.name}</div>

										{index === selectedProviders.length - 1 && (
											<button
												className="text-red-700"
												onClick={() => removeProvider(travel)}
											>
												EEMALDA
											</button>
										)}
									</div>
								))}
							</div>
						</div>
					))}
					{filteredTravel
						.filter((_, index) => index === selectedProviders.length)
						.map((travel) => (
							<div key={travel.id}>
								<div className="text-lg font-bold text-center">
									{t(travel.routeInfo.from.name)} -{" "}
									{t(travel.routeInfo.to.name)}
								</div>
								<div className="overflow-y-scroll h-[90vh] px-2">
									{travel.providers.length === 0 && (
										<div>Selliste kuupäevadega reisi ei leitud.</div>
									)}
									{travel.providers.length > 0 &&
										travel.providers.map((provider) => (
											<div
												key={provider.id}
												className="flex flex-row justify-between border-b-2 mb-2 hover:cursor-pointer hover:bg-slate-300"
												onClick={() => addProvider(travel, provider)}
											>
												<div>
													<div className="text-lg italic">
														{provider.company.name}
													</div>
													<span>
														{new Date(provider.flightStart).toLocaleString(
															undefined,
															dateOptions
														)}
													</span>
													<span> - </span>
													<span>
														{new Date(provider.flightEnd).toLocaleString(
															undefined,
															dateOptions
														)}
													</span>
												</div>

												<div className="font-semibold self-center">
													{provider.price} €
												</div>
											</div>
										))}
								</div>
							</div>
						))}
				</div>
			)}
		</>
	);
}

export default TravelReservation;
