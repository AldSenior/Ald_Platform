'use client'
import React, { useState } from 'react';

const Quiz = ({ questions }) => {
    const [answers, setAnswers] = useState(new Array(questions.length).fill(''));
    const [submitted, setSubmitted] = useState(false);

    const handleAnswerChange = (index, value) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = value;
        setAnswers(updatedAnswers);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            {questions.map((question, index) => (
                <div key={index} className="mb-4">
                    <h3 className="text-xl font-semibold">{question.question}</h3>
                    {question.options.map((option) => (
                        <label key={option} className="block mt-2">
                            <input
                                type="radio"
                                name={`question-${index}`}
                                value={option}
                                checked={answers[index] === option}
                                onChange={() => handleAnswerChange(index, option)}
                                required
                                className="mr-2"
                            />
                            {option}
                        </label>
                    ))}
                </div>
            ))}
            <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition duration-300">
                Отправить ответы
            </button>

            {submitted && (
                <div className="mt-4">

                    <h2 className="text-lg font-bold">Ваши ответы:</h2>
                    {answers.map((ans, index) => (
                        <p key={index} className="mt-1">
                            Вопрос {index + 1}: {ans}
                        </p>
                    ))}
                </div>
            )}
        </form>
    );
};

export default Quiz;
