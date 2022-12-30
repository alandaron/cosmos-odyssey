import { Routes, Route, Link, NavLink } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Reservations from "./pages/Reservations";

function App() {
	return (
		<div>
			<div className="flex items-center gap-3 mt-2">
				<div className="text-red-800 text-3xl font-semibold w-[35%] text-center">
					Cosmos Odyssey
				</div>
				<div className="flex gap-5">
					<NavLink to="/">
						<div className="p-2 rounded-md hover:text-blue-600">
							Uus broneering
						</div>
					</NavLink>
					<NavLink to="/reservations">
						<div className="p-2 rounded-md hover:text-blue-600">
							Vaata broneeringuid
						</div>
					</NavLink>
				</div>
			</div>
			<Routes>
				<Route path="" element={<Home />} />
				<Route path="reservations" element={<Reservations />} />
			</Routes>
		</div>
	);
}

export default App;
