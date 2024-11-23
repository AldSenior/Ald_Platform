import Editor from '@monaco-editor/react';
import React, {useEffect, useState} from 'react';
import ReactConfetti from 'react-confetti';
import useCodeRunner from '../{hooks}/useCodeRunner'; // Укажите путь к вашему хуку

const CodeEditor = ({id, functionName, description}) => {
    const {
        output,
        isRunning,
        isAllTestsPassed,
        runCode,
        logResults,
        checkIfAllTestsPassed,
    } = useCodeRunner(id);

    const [code, setCode] = useState('// Ожидайте...');
    const [dataLoaded, setDataLoaded] = useState(false);
    useEffect(() => {
        if (description && functionName) {
            setCode(`function ${functionName}(num) {\n\n}`);
            setDataLoaded(true);
        }
    }, [description, functionName]);

    const handleRunCode = async () => {
        const results = await runCode(code);
        if (results.success) {
            checkIfAllTestsPassed(results.results);
            logResults(results.results);
        } else {
            console.error("Ошибка выполнения кода.");
        }
    };

    return (
        <div className="flex h-screen">
            {/* Контент с редактором */}
            <div className="flex-1 bg-gray-900 text-white flex flex-col p-6">
                {isAllTestsPassed && <ReactConfetti/>}


                    <Editor
                        value={code}
                        onChange={(value) => setCode(value)}
                        height="50%"
                        width="100%"
                        language="javascript"
                        theme="vs-dark"
                        options={{
                            readOnly: !dataLoaded,
                        }}
                    />

                <div className="my-4">
                    <button
                        onClick={handleRunCode}
                        disabled={isRunning}
                        className={`px-4 py-2 rounded transition-colors duration-300 
                                    ${isRunning ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'} 
                                    text-white`}
                    >
                        {isRunning ? 'Запуск...' : 'Запустить код'}
                    </button>
                </div>

                <div className="w-full mt-4">
                    <h3 className="text-lg font-semibold mb-2">Результаты:</h3>
                    <div className="bg-gray-700 rounded overflow-y-auto" style={{maxHeight: '150px'}}>
                        <pre>{output}</pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeEditor;
