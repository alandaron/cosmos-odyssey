import { useState } from "react";
import { useTranslation } from "react-i18next";

function TravelSearch({
	travelPrices,
	setSelectedTravel,
	setSelectedProviders,
}) {
	const { t } = useTranslation();
	const [travelOptions, setTravelOptions] = useState([]);
	const [searchType, setSearchType] = useState("direct");

	const [fromPlanet, setFromPlanet] = useState("");
	const [toPlanet, setToPlanet] = useState("");

	const planets = [
		{ name: "Mercury" },
		{ name: "Venus" },
		{ name: "Earth" },
		{ name: "Mars" },
		{ name: "Jupiter" },
		{ name: "Saturn" },
		{ name: "Uranus" },
		{ name: "Neptune" },
	];

	const [toPlanets, setToPlanets] = useState([]);

	const changeSearchType = (type) => {
		setSearchType(type);
		setFromPlanet("");
		setToPlanet("");
	};

	const changeFromPlanet = (planet) => {
		if (searchType === "direct") {
			let planetsFromPrices = [];
			planetsFromPrices = travelPrices
				.filter((e) => e.routeInfo.from.name === planet)
				.map((travel) => travel.routeInfo.to.name);

			setToPlanets(planetsFromPrices);
			setToPlanet(planetsFromPrices[0]);
		}
		setFromPlanet(planet);
	};

	function findRoutes(objects, from, to) {
		// Create a set to store the routes
		const routes = new Set();

		// Create a helper function to find routes recursively
		function findRoutesHelper(current, destination, path, visited) {
			// If the current location is the destination, add the path to the routes set if it is not already present
			if (current === destination && !routes.has(path)) {
				routes.add(path);
			} else {
				// Loop through each object in the array
				for (const obj of objects) {
					// If the object has a "routeInfo" property with a "from" and "to" property,
					// and the "from" property matches the current location,
					// and the "to" location has not been visited yet,
					// recursively call the helper function with the "to" property as the current location,
					// the path so far, and the updated set of visited locations
					if (
						obj.routeInfo.from.name === current &&
						!visited.has(obj.routeInfo.to.name)
					) {
						findRoutesHelper(
							obj.routeInfo.to.name,
							destination,
							[...path, obj.routeInfo.to.name],
							new Set([...visited, obj.routeInfo.to.name])
						);
					}
				}
			}
		}

		// Start the recursive search with the input "from" location as the current location, an empty path, and an empty set of visited locations
		findRoutesHelper(from, to, [from], new Set([from]));

		// Convert the routes set to an array
		return [...routes];
	}

	const searchTravelOptions = () => {
		if (searchType === "direct") {
			const directRoute = travelPrices.filter(
				(e) =>
					e.routeInfo.from.name === fromPlanet &&
					e.routeInfo.to.name === toPlanet
			);
			setTravelOptions([]);
			setSelectedProviders([]);
			setSelectedTravel(directRoute);
		} else if (searchType === "change") {
			const routes = findRoutes([...travelPrices], fromPlanet, toPlanet);
			let travelOptions = [];

			for (let index = 0; index < routes.length; index++) {
				let routeOptions = [];
				for (
					let nameIndex = 0;
					nameIndex < routes[index].length - 1;
					nameIndex++
				) {
					const fromName = routes[index][nameIndex];
					const toName = routes[index][nameIndex + 1];

					const filter = travelPrices.filter(
						(e) =>
							e.routeInfo.from.name === fromName &&
							e.routeInfo.to.name === toName
					);

					routeOptions.push(filter[0]);
				}

				travelOptions.push(routeOptions);
			}
			setTravelOptions(travelOptions);
		}
	};

	return (
		<>
			<div className="grid w-[100%] grid-cols-2 rounded-xl bg-orange-800 text-white p-2 mb-2">
				<div className="flex items-center pl-4 w-full ml-[50%]">
					<input
						defaultChecked
						id="direct-radio"
						type="radio"
						value="direct"
						name="bordered-radio"
						className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
						onClick={(e) => changeSearchType(e.target.value)}
					/>
					<label
						htmlFor="direct-radio"
						className="py-2 ml-2 w-full text-sm font-medium "
					>
						Otsereisid
					</label>
				</div>
				<div className="flex items-center pl-4 w-full mr-[50%]">
					<input
						id="change-radio"
						type="radio"
						value="change"
						name="bordered-radio"
						className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
						onClick={(e) => changeSearchType(e.target.value)}
					/>
					<label
						htmlFor="change-radio"
						className="py-2 ml-2 w-full text-sm font-medium "
					>
						Ümberistumisega reisid
					</label>
				</div>
			</div>
			<div className="w-full flex gap-1 bg-orange-800 text-white rounded-lg p-3 mb-2">
				<div className="w-[30%] text-right">Vali lähtekoht:</div>
				<select
					className="w-[70%] bg-orange-800"
					onChange={(e) => changeFromPlanet(e.target.value)}
					value={fromPlanet}
				>
					<option value="" disabled>
						Vali lähtekoht
					</option>
					{planets.map((planet, index) => (
						<option value={planet.name} key={index}>
							{t(planet.name)}
						</option>
					))}
				</select>
			</div>
			<div className="w-full flex gap-1 bg-orange-800 text-white rounded-lg p-3 mb-2">
				<div className="w-[30%] text-right">Vali sihtkoht:</div>
				<select
					className="w-[70%] bg-orange-800"
					onChange={(e) => setToPlanet(e.target.value)}
					value={toPlanet}
				>
					<option value="" disabled>
						Vali sihtkoht
					</option>

					{searchType === "direct"
						? toPlanets.map((planet, index) => (
								<option value={planet} key={index}>
									{t(planet)}
								</option>
						  ))
						: planets
								.filter((e) => e.name !== fromPlanet)
								.map((planet, index) => (
									<option value={planet.name} key={index}>
										{t(planet.name)}
									</option>
								))}
				</select>
			</div>
			<div className="text-center">
				<button
					className="w-[20%] bg-blue-600 rounded-lg mx-1 text-white py-1 hover:bg-blue-500"
					onClick={searchTravelOptions}
				>
					Otsi
				</button>
			</div>
			{travelOptions.length > 0 && (
				<div className="w-full mt-5">
					<div className="font-semibold text-xl text-center">
						Otsingu tulemused
					</div>
					<div>
						{travelOptions
							.sort((a, b) => a.length - b.length)
							.map((options, index) => (
								<div
									className="my-3 px-2 bg-stone-800 text-white rounded-lg hover:cursor-pointer hover:bg-stone-700"
									key={index}
									onClick={() => {
										setSelectedTravel(options);
										setSelectedProviders([]);
									}}
								>
									<div>
										VARIANT {index + 1} ({options.length} hüpet)
									</div>
									{options.map((option) => (
										<div key={option.id}>
											<div className="text-sm">
												{t(option.routeInfo.from.name)}
												<span> - </span>
												{t(option.routeInfo.to.name)}
											</div>
										</div>
									))}
								</div>
							))}
					</div>
				</div>
			)}
		</>
	);
}

export default TravelSearch;
