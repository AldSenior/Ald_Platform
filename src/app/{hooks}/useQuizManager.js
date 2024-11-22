import { useState } from 'react';

const useQuizManager = (initialQuestions) => {
    const [questions, setQuestions] = useState(initialQuestions);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);

    // Получить текущий вопрос
    const currentQuestion = questions[currentQuestionIndex];

    // Проверка на завершенность викторины
    const isQuizCompleted = () => {
        return currentQuestionIndex >= questions.length;
    };

    // Обработчик ответа
    const submitAnswer = (selectedOption) => {
        const isCorrect = selectedOption === currentQuestion.correctAnswer; // Предполагается, что у текущего вопроса есть поле correctAnswer
        setAnswers([...answers, selectedOption]); // Логируем ответ
        return { isCorrect, correctAnswer: currentQuestion.correctAnswer }; // Возвращаем результат
    };

    // Переход к следующему вопросу
    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1); // Переход к следующему вопросу
        }
        // Вы можете добавить логику для нечисловых вопросов или проверки
    };

    // Получить результат
    const getScore = () => {
        return answers.filter((answer, index) => answer === questions[index]?.correctAnswer).length; // Проверяем правильные ответы
    };

    // Сброс викторины
    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setAnswers([]);
    };

    const setQuizManager = (newQuestions) => {
        setQuestions(newQuestions);
    };

    return {
        currentQuestion,
        submitAnswer,
        nextQuestion,
        isQuizCompleted,
        getScore,
        resetQuiz,
        setQuizManager,
    };
};

export default useQuizManager;
