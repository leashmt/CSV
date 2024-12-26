import React, { useState } from 'react';
import Papa from 'papaparse';

function UploadCSVPage({ onCSVUploaded }) {
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');

	const handleFileUpload = e => {
		const file = e.target.files[0];

		if (!file || file.type !== 'text/csv') {
			setError('Veuillez sélectionner un fichier CSV valide.');
			return;
		}

		Papa.parse(file, {
			header: true,
			skipEmptyLines: true,
			complete: result => {
				if (result && result.data) {
					setMessage('Données CSV chargées avec succès.');
					onCSVUploaded(result.data);
				} else {
					setError('Erreur : données CSV invalides.');
				}
			},
			error: () => {
				setError('Erreur lors de la lecture du fichier.');
			},
		});
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
			<h1 className="text-2xl font-bold mb-6">Télécharger un fichier CSV</h1>
			<input
				type="file"
				accept=".csv"
				onChange={handleFileUpload}
				className="mb-4 p-2 border rounded-md bg-white"
			/>
			{error && <p className="text-red-500">{error}</p>}
			{message && <p className="text-green-500">{message}</p>}
		</div>
	);
}

export default UploadCSVPage;
