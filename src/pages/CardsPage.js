import React, { useState } from 'react';

function CardsPage({ csvData }) {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [flipped, setFlipped] = useState(false);

	if (!csvData || csvData.length === 0) {
		return (
			<div className="flex items-center justify-center h-screen bg-gray-100">
				<h1 className="text-xl text-gray-500">Aucune donnée CSV chargée.</h1>
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

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
			<div
				className={`relative w-96 h-64 bg-white border rounded-lg shadow-md transition-transform ${
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
						{shuffledAnswers.map((answer, index) => (
							<p key={index} className="text-sm mb-2">
								{answer}
							</p>
						))}
					</div>
				)}
			</div>

			{/* Navigation Buttons */}
			<div className="flex mt-6">
				<button
					onClick={handlePrevious}
					disabled={currentQuestionIndex === 0}
					className="px-4 py-2 mr-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
				>
					Précédent
				</button>
				<button
					onClick={handleNext}
					disabled={currentQuestionIndex === questions.length - 1}
					className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
				>
					Suivant
				</button>
			</div>
		</div>
	);
}

export default CardsPage;
