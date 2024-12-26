import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CardsPage({ csvData }) {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [flipped, setFlipped] = useState(false);
	const navigate = useNavigate();

	if (!csvData || csvData.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center h-screen bg-teal-50">
				<h1 className="text-xl text-gray-500">Aucune donnée CSV chargée.</h1>
				<button
					onClick={() => navigate('/')}
					className="mt-4 px-4 py-2 bg-teal-400 hover:bg-teal-600 text-white shadow-md rounded"
				>
					Télécharger un fichier CSV
				</button>
			</div>
		);
	}

	const questions = Object.keys(csvData[0]).slice(1);

	const currentQuestion = questions[currentQuestionIndex];
	const answers = csvData.map(row => row[currentQuestion]).filter(Boolean);
	const shuffledAnswers = answers.sort(() => Math.random() - 0.5);

	const handleNext = () => {
		setFlipped(false);
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(prev => prev + 1);
		}
	};

	const handlePrevious = () => {
		setFlipped(false);
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(prev => prev - 1);
		}
	};

	console.log(flipped);
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
			<div
				className={`relative w-5/6 h-4/6 bg-white border rounded-lg shadow-md transition-transform ${
					flipped ? 'rotate-y-180' : ''
				}`}
				onClick={() => setFlipped(prev => !prev)}
			>
				{/* Front Side */}
				{!flipped && (
					<div className="flex items-center justify-center h-full text-center text-lg font-bold p-4">
						{currentQuestion}
					</div>
				)}

				{/* Back Side */}
				{flipped && (
					<div className="flex flex-col items-center justify-center h-full text-center p-4">
						<h2 className="text-teal-600 font-bold mb-3">
							{currentQuestion}
						</h2>
						<div className="flex-grow max-h-full overflow-y-auto w-5/6">
							{shuffledAnswers.map((answer, index) => {
								const answerItems = answer.split(';');
								return (
									<div
										key={index}
										className={`text-left p-2 mt-2 ${
											index % 2 === 0
												? 'bg-teal-100 rounded'
												: 'bg-white'
										}`}
									>
										{answerItems.length > 1 ? (
											<ul className="list-disc pl-5">
												{answerItems.map((item, idx) => (
													<li
														key={idx}
														className="text-sm mb-2"
													>
														{item}
													</li>
												))}
											</ul>
										) : (
											<p className="text-sm mb-2 text-left">
												{answer}
											</p>
										)}
									</div>
								);
							})}
						</div>
					</div>
				)}
			</div>
			{/* Navigation Buttons */}
			<div className="flex mt-6 justify-end w-5/6">
				<button
					onClick={handlePrevious}
					disabled={currentQuestionIndex === 0}
					className="px-4 py-2 mr-2 bg-teal-300 hover:bg-teal-500 text-white shadow-md rounded disabled:bg-gray-300"
				>
					Précédent
				</button>
				<button
					onClick={handleNext}
					disabled={currentQuestionIndex === questions.length - 1}
					className="px-4 py-2 bg-teal-400 hover:bg-teal-600 text-white shadow-md rounded disabled:bg-gray-300"
				>
					Suivant
				</button>
			</div>
		</div>
	);
}

export default CardsPage;
