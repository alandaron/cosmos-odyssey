import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Reservation from "./pages/Reservation";

function App() {
	return (
		<div>
			<div className="flex flex-col gap-2 mt-2">
				<div className="text-red-800 text-xl w-[35%] text-center">
					Cosmos Odyssey
				</div>
			</div>
			<Routes>
				<Route path="" element={<Home />} />
				<Route path="reservation" element={<Reservation />} />
			</Routes>
		</div>
	);
}

export default App;
