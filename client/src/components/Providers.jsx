import { useTranslation } from "react-i18next";

function Providers({
	travels,
	searchInput,
	setSearchInput,
	sort,
	addProvider,
}) {
	const { t } = useTranslation();

	const dateOptions = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	};

	const search = (input) => {
		setSearchInput(input);
	};

	return (
		<>
			{travels.map((travel) => (
				<div key={travel.id}>
					<div>
						<div className="text-lg font-bold">
							{t(travel.routeInfo.from.name)} - {t(travel.routeInfo.to.name)}
						</div>
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
					</div>
					<div className="overflow-y-scroll h-[70vh] pr-2 mt-2">
						{travel.providers.length === 0 && (
							<div>Hilisemate kuupäevadega pakkujaid ei leitud.</div>
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
		</>
	);
}

export default Providers;
