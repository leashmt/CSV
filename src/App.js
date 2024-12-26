import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadCSVPage from './pages/UploadCSVPage';
import CardsPage from './pages/CardsPage';

function App() {
	const [csvData, setCsvData] = useState([]);
	console.log(csvData);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<UploadCSVPage onCSVUploaded={setCsvData} />} />
				<Route path="/cards" element={<CardsPage csvData={csvData} />} />
			</Routes>
		</Router>
	);
}

export default App;
