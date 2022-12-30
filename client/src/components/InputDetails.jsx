import { useRef } from "react";

function InputDetails({ loading, saveReservation }) {
	const firstNameRef = useRef();
	const lastNameRef = useRef();

	return (
		<>
			<div className="font-semibold text-xl text-center mt-6">Sinu andmed</div>
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
				className="w-[20%] inline-flex items-center space-x-2 justify-center bg-blue-600 rounded-lg mx-1 text-white py-1 hover:bg-blue-500 disabled:pointer-events-none disabled:opacity-75"
				disabled={loading}
				onClick={() =>
					saveReservation(firstNameRef.current.value, lastNameRef.current.value)
				}
			>
				{loading ? (
					<>
						<svg className="h-4 w-4 animate-spin" viewBox="3 3 18 18">
							<path
								className="fill-blue-800"
								d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
							></path>
							<path
								className="fill-blue-100"
								d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
							></path>
						</svg>
						<span>Laadimine...</span>
					</>
				) : (
					<span>Kinnita broneering</span>
				)}
			</button>
		</>
	);
}

export default InputDetails;
