'use client';
import {useState} from 'react';

// Хук для выполнения кода и управления его состоянием
const useCodeRunner = (id) => {
    const [output, setOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [isAllTestsPassed, setIsAllTestsPassed] = useState(false);

    const handleLog = (message) => {
        setOutput((prev) => `${prev}\n${message}`);
    };

    const runCode = async (code) => {
        if (!code.trim()) {
            handleLog('Ошибка: Код не может быть пустым');
            return {success: false, results: []};
        }

        setIsRunning(true);
        setOutput("");
        try {
            const response = await fetch('/api/checkFunc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({code, id}),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Ошибка в серверном ответе');
            }

            const responseData = await response.json();
            console.log("Response Data:", responseData); // Для отладки

            // Проверяем, чтобы results были массивом
            if (!Array.isArray(responseData.results)) {
                handleLog('Ошибка: Результаты не являются массивом.');
                return {success: false, results: []};
            }

            return {success: true, results: responseData.results}; // Возвращаем успешный результат
        } catch (error) {
            handleLog(`Ошибка: ${error.message}`);
            return {success: false, results: []}; // Возвращаем пустые результаты в случае ошибки
        } finally {
            setIsRunning(false); // Останавливаем выполнение
        }
    };

    const checkIfAllTestsPassed = (results) => {
        if (!Array.isArray(results)) {
            handleLog('Ошибка: Результаты должны быть массивом для проверки тестов.');
            return;
        }

        const allPassed = results.every(({passed}) => passed);
        if (allPassed) {
            setIsAllTestsPassed(true);
            setTimeout(() => setIsAllTestsPassed(false), 5000); // Скрыть через 5 секунд
        }
    };

    const logResults = (results) => {
        if (!Array.isArray(results)) {
            handleLog('Ошибка: Результаты должны быть массивом для логирования.');
            return;
        }

        results.forEach(({input, expected, output, passed, error}) => {
            const resultMessage = `Входные данные: ${input} | Ожидалось: ${expected} | Получено: ${output || 'ошибка'} | ${passed ? 'Успех' : 'Неудача'}\n`;

            handleLog(resultMessage);
            if (error) {
                handleLog(`Ошибка: ${error}`);
            }
        });
    };

    return {
        output,
        isRunning,
        isAllTestsPassed,
        runCode,
        logResults,
        checkIfAllTestsPassed,
    };
};

export default useCodeRunner;
