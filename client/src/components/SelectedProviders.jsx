import { useTranslation } from "react-i18next";

function SelectedProviders({ viewOnly, selectedProviders, removeProvider }) {
	const { t } = useTranslation();
	const dateOptions = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	};

	return (
		<>
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
									<div className="text-lg italic">{provider.company.name}</div>
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

								<div className="flex space-x-2">
									<div className="font-semibold self-center">
										{provider.price} €
									</div>

									{index === selectedProviders.length - 1 && !viewOnly && (
										<button
											className=" bg-red-700 rounded-lg px-2 text-white hover:bg-red-500"
											onClick={() => removeProvider(travel)}
										>
											Eemalda
										</button>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			))}
		</>
	);
}

export default SelectedProviders;
