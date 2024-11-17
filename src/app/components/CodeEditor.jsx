'use client';

import React, { useEffect, useState } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';

const CodeEditor = ({id,functionName,description}) => {
      // Получаем ID из параметров маршрута
    const monaco = useMonaco();
    const [code, setCode] = useState(`// ${description}\nfunction ${functionName}(num) {\n\n}`)
    const [output, setOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);

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
        if (!code.trim()) { // Проверка на пустоту
            handleLog('Ошибка: Код не может быть пустым');
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
                body: JSON.stringify({ code, id }),
            });

            if (!response.ok) {
                setOutput('');
                const errorData = await response.json();
                throw new Error(errorData.error || 'Ошибка в серверном ответе');
            }
            // Выводим результаты тестов
            results.forEach(({ input, expected, output, passed }) => {
                const resultMessage = `Входные данные: ${input} | Ожидалось: ${expected} | Получено: ${output} | ${passed ? 'Успех' : 'Неудача'}`;
                handleLog(resultMessage);
            });
        } catch (error) {
            handleLog(`Ошибка: ${error.message}`);
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div>
            <Editor
                height="40vh"
                defaultValue={code}
                defaultLanguage="javascript"
                theme="vs-dark"
                onChange={(value) => setCode(value)}
            />
            <button onClick={handleRunCode}>Запустить Код</button>
            <pre style={{ whiteSpace: "pre-wrap", backgroundColor: "#f5f5f5", padding: "10px", borderRadius: "5px", marginTop: "10px" }}>
                {output}
            </pre>
        </div>
    );
};

export default CodeEditor;
