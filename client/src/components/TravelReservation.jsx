import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

function TravelReservation({
	selectedTravel,
	setSelectedTravel,
	selectedProviders,
	setSelectedProviders,
}) {
	const { t } = useTranslation();
	const [searchInput, setSearchInput] = useState([]);
	const firstNameRef = useRef();
	const lastNameRef = useRef();

	const dateOptions = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	};

	const saveReservation = () => {
		const firstName = firstNameRef.current.value;
		const lastName = lastNameRef.current.value;
		const totalSum = calculateSum();
		const totalTime = calculateTravelTime();

		console.log("Eesnimi:", firstName);
		console.log("Perenimi:", lastName);
		console.log("Teekonnad:", selectedProviders);
		console.log("Hind kokku:", totalSum);
		console.log("Reisiaeg:", totalTime);
	};

	const addProvider = (travel, provider) => {
		const newProvider = { ...travel, providers: [provider] };
		setSelectedProviders([...selectedProviders, newProvider]);
	};

	const removeProvider = (travel) => {
		const index = selectedProviders.findIndex((e) => e.id === travel.id);
		selectedProviders.splice(index, 1);
		setSelectedProviders([...selectedProviders]);
	};

	const filteredTravel = selectedTravel
		.map((travel) => {
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
		})
		.filter((_, index) => index === selectedProviders.length);

	const calculateSum = () => {
		let total = 0;
		for (let index = 0; index < selectedProviders.length; index++) {
			total += selectedProviders[index].providers[0].price;
		}
		return total;
	};

	const calculateTravelTime = () => {
		const endDate = new Date(
			selectedProviders[selectedProviders.length - 1].providers[0].flightEnd
		);
		const startDate = new Date(selectedProviders[0].providers[0].flightStart);
		const diff = new Date(endDate.getTime() - startDate.getTime());
		const years = diff.getUTCFullYear() - 1970;
		const months = diff.getUTCMonth();
		const days = diff.getUTCDate() - 1;
		const hours = diff.getUTCHours();
		const minutes = diff.getUTCMinutes();

		return { years, months, days, hours, minutes };
	};

	const search = (input) => {
		setSearchInput(input);
	};

	const sort = (travel, type) => {
		if (type === "name") {
			travel.providers.sort((a, b) =>
				a.company.name.localeCompare(b.company.name)
			);
			const index = selectedTravel.findIndex((e) => e.id === travel.id);
			selectedTravel[index].providers = travel.providers;
			setSelectedTravel([...selectedTravel]);
		} else if (type === "price") {
			travel.providers.sort((a, b) => a.price - b.price);
			const index = selectedTravel.findIndex((e) => e.id === travel.id);
			selectedTravel[index].providers = travel.providers;
			setSelectedTravel([...selectedTravel]);
		} else if (type === "time") {
			travel.providers.sort((a, b) => {
				const endDateA = new Date(a.flightEnd);
				const startDateA = new Date(a.flightStart);
				const diffA = new Date(endDateA.getTime() - startDateA.getTime());

				const endDateB = new Date(b.flightEnd);
				const startDateB = new Date(b.flightStart);
				const diffB = new Date(endDateB.getTime() - startDateB.getTime());
				return diffA - diffB;
			});
			const index = selectedTravel.findIndex((e) => e.id === travel.id);
			selectedTravel[index].providers = travel.providers;
			setSelectedTravel([...selectedTravel]);
		}
	};

	return (
		<>
			<div className="font-semibold text-xl text-center">
				Vali teenusepakkujad
			</div>

			{selectedTravel.length > 0 && (
				<div>
					{selectedProviders.map((travel, index) => (
						<div key={travel.id}>
							<div className="text-lg font-bold">
								{t(travel.routeInfo.from.name)} - {t(travel.routeInfo.to.name)}
							</div>
							<div>
								{travel.providers.map((provider) => (
									<div
										key={provider.id}
										className="flex flex-row justify-between border-b-2 mb-2"
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

										{index === selectedProviders.length - 1 && (
											<button
												className=" bg-red-700 rounded-lg px-2 text-white hover:bg-red-500"
												onClick={() => removeProvider(travel)}
											>
												Eemalda
											</button>
										)}
									</div>
								))}
							</div>
						</div>
					))}
					{filteredTravel.map((travel) => (
						<div key={travel.id}>
							<div className="text-lg font-bold">
								{t(travel.routeInfo.from.name)} - {t(travel.routeInfo.to.name)}
							</div>
							<div className="overflow-y-scroll h-[70vh] pr-2">
								{travel.providers.length === 0 && (
									<div>Hilisemate kuupäevadega pakkujaid ei leitud.</div>
								)}

								{travel.providers.length > 0 && (
									<div className="flex w-full items-center gap-1">
										<label>Otsi:</label>
										<input
											className="appearance-none block bg-gray-100 text-gray-700 border border-gray-200 rounded py-1 px-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
											id="grid-first-name"
											type="text"
											placeholder="Teenusepakkuja (SpaceX)"
											value={searchInput}
											onChange={(e) => search(e.target.value)}
										/>
										<label>Sordi:</label>
										<select
											defaultValue=""
											onChange={(e) => sort(travel, e.target.value)}
										>
											<option value="" disabled>
												Vali sorteering
											</option>

											<option value="name">Nime järgi</option>
											<option value="price">Hinna järgi</option>
											<option value="time">Reisiaja järgi</option>
										</select>
									</div>
								)}
								{travel.providers.length > 0 &&
									travel.providers
										.filter((e) =>
											e.company.name.toLowerCase().includes(searchInput)
										)
										.map((provider) => (
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

			{selectedTravel.length > 0 &&
				selectedTravel.length === selectedProviders.length && (
					<div>
						<div className="flex flex-row justify-between">
							<div className="font-semibold text-xl">
								<span>Reisiaeg: </span>

								{calculateTravelTime().years > 0 && (
									<>
										{calculateTravelTime().years.toLocaleString(
											undefined,
											dateOptions
										)}
										<span> aastat </span>
									</>
								)}

								{calculateTravelTime().months > 0 && (
									<>
										{calculateTravelTime().months.toLocaleString(
											undefined,
											dateOptions
										)}
										<span> kuud </span>
									</>
								)}

								{calculateTravelTime().days > 0 && (
									<>
										{calculateTravelTime().days.toLocaleString(
											undefined,
											dateOptions
										)}
										<span> päeva </span>
									</>
								)}

								{calculateTravelTime().hours > 0 && (
									<>
										{calculateTravelTime().hours.toLocaleString(
											undefined,
											dateOptions
										)}
										<span> tundi </span>
									</>
								)}

								{calculateTravelTime().minutes > 0 && (
									<>
										{calculateTravelTime().minutes.toLocaleString(
											undefined,
											dateOptions
										)}
										<span> minutit </span>
									</>
								)}
							</div>

							<div className="font-semibold text-xl">
								Hind kokku: {calculateSum().toFixed(2)} €
							</div>
						</div>
						<div className="font-semibold text-xl text-center mt-6">
							Sinu andmed
						</div>
						<div className="flex flex-wrap -mx-3 mt-6">
							<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
								<label
									className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="grid-first-name"
								>
									Eesnimi
								</label>
								<input
									className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									id="grid-first-name"
									type="text"
									placeholder="Joe"
									ref={firstNameRef}
								/>
							</div>
							<div className="w-full md:w-1/2 px-3">
								<label
									className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="grid-last-name"
								>
									Perenimi
								</label>
								<input
									className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									id="grid-last-name"
									type="text"
									placeholder="Doe"
									ref={lastNameRef}
								/>
							</div>
						</div>
						<button
							className="w-[20%] bg-blue-600 rounded-lg mx-1 text-white py-1 hover:bg-blue-500"
							onClick={saveReservation}
						>
							Kinnita broneering
						</button>
					</div>
				)}
		</>
	);
}

export default TravelReservation;
