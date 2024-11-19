'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

const LessonPage = () => {
    const params = useParams();
    const { id } = params;
    const router = useRouter();

    const [lesson, setLesson] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [result, setResult] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);

    useEffect(() => {
        const fetchLesson = async () => {
            const response = await fetch(`/api/lessons/${id}`);
            if (response.ok) {
                const data = await response.json();
                setLesson(data);
            } else {
                console.error('Ошибка при загрузке урока:', response.statusText);
            }
        };

        fetchLesson();
    }, [id]);

    if (!lesson) {
        return <div className="text-center text-red-500">Загрузка урока...</div>;
    }

    const currentQuestion = lesson.questions[currentQuestionIndex];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedOption === currentQuestion.correctAnswer) {
            setResult('Правильно!');
        } else {
            setResult(`Неправильно! Правильный ответ: ${currentQuestion.correctAnswer}`);
        }
        setIsAnswered(true);
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption('');
        setResult(null);
        setIsAnswered(false);
    };

    const handleGoBack = () => {
        router.back(); // Возвращаем на предыдущую страницу
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center text-gray-800">{lesson.title}</h1>
            <h2 className="mt-4 text-lg text-gray-700">{currentQuestion.question}</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <input
                            type="radio"
                            id={option}
                            name="answer"
                            value={option}
                            onChange={(e) => setSelectedOption(e.target.value)}
                            disabled={isAnswered}
                            checked={selectedOption === option}
                            className="hidden" // Скрываем стандартный инпут
                        />
                        <label
                            htmlFor={option}
                            className={`cursor-pointer border rounded-md py-2 px-4 transition duration-300 
                                        ${selectedOption === option ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} 
                                        ${isAnswered ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-100'}`}
                        >
                            {option}
                        </label>
                    </div>
                ))}

                <button
                    type="submit"
                    className={`mt-4 px-4 py-2 text-white rounded-md transition duration-150 ease-in-out 
                    ${isAnswered ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                    disabled={isAnswered}
                >
                    Проверить ответ
                </button>
            </form>

            {result && <p className="mt-4 text-xl font-bold text-blue-500">{result}</p>}
            {isAnswered && currentQuestionIndex < lesson.questions.length - 1 && (
                <button
                    onClick={handleNextQuestion}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-150 ease-in-out"
                >
                    Следующий вопрос
                </button>
            )}
            {isAnswered && currentQuestionIndex === lesson.questions.length - 1 && (
                <div className="mt-4">
                    <button
                        onClick={handleGoBack}
                        className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition duration-150 ease-in-out"
                    >
                        Вернуться к тестам
                    </button>
                </div>
            )}
        </div>
    );
};

export default LessonPage;
