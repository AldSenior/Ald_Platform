'use client';

import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import ReactConfetti from 'react-confetti';
import useCodeRunner from '../{hooks}/useCodeRunner'; // Путь до вашего хука

const CodeEditor = ({ id, functionName, description }) => {
    const {
        output,
        isRunning,
        isAllTestsPassed,
        runCode,
        logResults,
        checkIfAllTestsPassed,
    } = useCodeRunner(id);

    const [code, setCode] = useState("Ожидайте...");
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if (description && functionName) {
            setCode(`// ${description}\nfunction ${functionName}(num) {\n\n}`); // Здесь исправлено на шаблонную строку
            setDataLoaded(true);
        }
    }, [description, functionName]);

    const handleRunCode = async () => {
        const results = await runCode(code); // Выполняем код и получаем результаты
        if (results.success) {
            checkIfAllTestsPassed(results.results); // Изменено: передаем только results
            logResults(results.results); // Изменено: передаем только results
        } else {
            console.error("Ошибка выполнения кода.");
        }
    };

    return (
        <div>
            {isAllTestsPassed && <ReactConfetti />}
            <Editor
                value={code}
                onChange={(value) => setCode(value)}
                height="500px"
                language="javascript"
                theme="vs-dark"
                options={{
                    readOnly: !dataLoaded,
                }}
            />
            <button onClick={handleRunCode} disabled={isRunning}>
                Запустить код
            </button>
            <div>{output}</div>
        </div>
    );
};

export default CodeEditor;
