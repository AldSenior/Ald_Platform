'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import useQuizManager from '../../{hooks}/useQuizManager';

const TestPage = () => {
    const params = useParams();
    const { id } = params;
    const router = useRouter();

    const [test, setTest] = useState(null);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null); // Указываем индекс выбранного варианта
    const [result, setResult] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const {
        currentQuestion,
        submitAnswer,
        nextQuestion,
        isQuizCompleted,
        getScore,
        resetQuiz,
        setQuizManager
    } = useQuizManager([]);

    useEffect(() => {
        const fetchLesson = async () => {
            const response = await fetch(`/api/tests/${id}`);
            if (response.ok) {
                const data = await response.json();
                setTest(data);
                setQuizManager(data.questions); // Устанавливаем вопросы
                resetQuiz(); // Сбрасываем состояние викторины
            } else {
                console.error('Ошибка при загрузке урока:', response.statusText);
            }
        };

        fetchLesson();
    }, [id]);

    if (!test) {
        return <div className="text-center text-red-500">Загрузка урока...</div>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { isCorrect, correctAnswer } = submitAnswer(currentQuestion.options[selectedOptionIndex]); // Изменено для получения выбранного ответа
        setResult(isCorrect ? 'Правильно!' : `Неправильно! Правильный ответ: ${correctAnswer}`);
        setIsAnswered(true);
    };

    const handleNextQuestion = () => {
        nextQuestion();
        setSelectedOptionIndex(null);
        setResult(null);
        setIsAnswered(false);
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-lg my-10">
            {isQuizCompleted() ? (
                <div className="text-center text-white">
                    <h2 className="text-2xl font-bold">Тест завершен!</h2>
                    <p className="mt-2 text-lg">
                        Вы ответили правильно на {getScore()} из {test.questions.length} вопросов.
                    </p>
                    <button
                        onClick={() => router.push('/tests')}
                        className="mt-4 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none transition duration-300"
                    >
                        Вернуться к тестам
                    </button>
                </div>
            ) : (
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4 text-white">{test.title}</h1>
                    <h2 className="mt-4 text-xl text-gray-400 mb-4">{currentQuestion.question}</h2>
                    <form onSubmit={handleSubmit} className="mt-4">
                        {currentQuestion.options.map((option, index) => (
                            <div key={index} className="flex items-center justify-center mb-4">

                                <input
                                    type="radio"
                                    id={`option-${index}`} // Уникальный ID для каждой радиокнопки
                                    name="answer"
                                    value={option}
                                    onChange={() => setSelectedOptionIndex(index)} // Обновляем индекс выбранного варианта
                                    className="hidden peer"
                                    checked={selectedOptionIndex === index} // Проверяем, равен ли индекс
                                />
                                <label
                                    htmlFor={`option-${index}`}
                                    className={`flex items-center justify-center cursor-pointer rounded-lg px-4 py-3 transition duration-150 ease-in-out 
                                    w-full text-center ${selectedOptionIndex === index ? 'bg-blue-700 text-white' : 'bg-gray-600 text-gray-200 hover:bg-gray-500'}`}>
                                    {option}
                                </label>
                            </div>
                        ))}
                        {isAnswered && <p className="mt-2 text-lg font-semibold text-white">{result}</p>}
                        <button
                            type="submit"
                            className={`mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg focus:outline-none transition duration-300 ${selectedOptionIndex === null ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-700'}`}
                            disabled={selectedOptionIndex === null} // Отключаем кнопку, если не выбран ответ
                        >
                            Проверить
                        </button>
                    </form>
                    {isAnswered && !isQuizCompleted() && (
                        <button
                            onClick={handleNextQuestion}
                            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none transition duration-300"
                        >
                            Следующий вопрос
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default TestPage;
