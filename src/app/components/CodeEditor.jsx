'use client';

import React, { useEffect, useState } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import ReactConfetti from 'react-confetti';
import Link from 'next/link';

const CodeEditor = ({ id, functionName, description, loading }) => {
    const monaco = useMonaco();
    const [code, setCode] = useState("Ожидайте...");
    const [output, setOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [isAllTestsPassed, setIsAllTestsPassed] = useState(false); // Состояние для отслеживания успешного завершения тестов

    useEffect(() => {
        if (description && functionName) {
            // Обновляем код при изменении description или functionName
            setCode(`//${description}\nfunction ${functionName}(num) {\n\n}`);
        }
    }, [description, functionName]);

    useEffect(() => {
        if (monaco) {
            console.log('here is the monaco instance:', monaco);
        }
    }, [monaco]);

    const handleLog = (message) => {
        setOutput((prev) => `${prev}\n${message}`);
    };

    const handleRunCode = async () => {
        if (isRunning) return; // Не обрабатывать, если уже выполняется
        setIsRunning(true);
        setIsAllTestsPassed(false); // Сбрасываем состояние перед выполнением тестов
        if (!code.trim()) { // Проверка на пустоту
            handleLog('Ошибка: Код не может быть пустым');
            setIsRunning(false); // Обязательно останавливаем выполнение
            return;
        }

        try {
            setOutput('');
            // Отправляем код на сервер для проверки
            const response = await fetch('/api/checkFunc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, id }), // Сериализация объекта в JSON
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`${errorData.error || 'Ошибка в серверном ответе'}`); // Устранение синтаксической ошибки
            }

            // Обработка ответа от сервера
            const responseData = await response.json();
            const { results } = responseData;

            // Проверка, прошли ли все тесты
            const allPassed = results.every(({ passed }) => passed);
            if (allPassed) {
                setShowConfetti(true); // Запускаем анимацию конфетти
                setIsAllTestsPassed(true); // Устанавливаем состояние успешного завершения всех тестов
                setTimeout(() => setShowConfetti(false), 5000); // Скрыть через 5 секунд
            }

            // Логирование результатов
            results.forEach(({ input, expected, output, passed, error }) => {
                const resultMessage = `Входные данные: ${input} | Ожидалось: ${expected} | Получено: ${output || 'ошибка'} | ${passed ? 'Успех' : 'Неудача'}`;

                handleLog(resultMessage);
                if (error) {
                    handleLog(`Ошибка: ${error}`);
                }
            });
        } catch (error) {
            handleLog(`Ошибка: ${error.message}`);
        } finally {
            setIsRunning(false); // Остановите выполнение, независимо от результата
        }
    };

    // Определение следующего теста (замените на вашу логику)
    const nextTestId = Number(id) + 1; // Переход к следующему тесту (или реализуйте свою логику)

    return (
        <div className="p-4 bg-gray-800 text-white min-h-screen">
            {showConfetti && <ReactConfetti />}
            <Editor
                height="400px"
                options={{
                    readOnly: loading || !functionName,
                }}
                theme="vs-dark"
                language="javascript"
                value={code}
                onChange={setCode}
            />
            <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 transition"
            >
                {isRunning ? 'Запуск...' : 'Запустить код'}
            </button>
            {isAllTestsPassed && (
                <Link href={`/tests/${nextTestId}`}>
                    <button className="mt-4 ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 transition">
                        Следующий тест
                    </button>
                </Link>
            )}
            <pre className="mt-4 bg-gray-700 p-4 rounded-lg overflow-x-auto">{output}</pre>
        </div>
    );
};
export default CodeEditor;
