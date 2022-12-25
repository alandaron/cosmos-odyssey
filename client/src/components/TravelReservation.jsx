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

	return (
		<>
			{selectedTravel.length > 0 && (
				<div>
					{selectedProviders.map((travel) => (
						<div key={travel.id}>
							<div className="text-lg font-bold">
								{t(travel.routeInfo.from.name)} - {t(travel.routeInfo.to.name)}
							</div>
							<div>
								{travel.providers.map((provider) => (
									<div className="border-b-2 mb-2">
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
										<button className="text-red-700">EEMALDA</button>
									</div>
								))}
							</div>
						</div>
					))}
					{selectedTravel
						.filter(
							(travel) =>
								selectedProviders.findIndex((e) => e.id === travel.id) === -1
						)
						.map((travel) => (
							<div key={travel.id}>
								<div className="text-lg font-bold">
									{t(travel.routeInfo.from.name)} -{" "}
									{t(travel.routeInfo.to.name)}
								</div>
								<div className="overflow-y-scroll h-[90vh]">
									{travel.providers.map((provider) => (
										<div
											className="border-b-2 mb-2 hover:cursor-pointer hover:bg-slate-300"
											onClick={() => addProvider(travel, provider)}
										>
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
