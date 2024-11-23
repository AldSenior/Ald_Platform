import Editor from '@monaco-editor/react'
import React, { useEffect, useState } from 'react'
import ReactConfetti from 'react-confetti'
import useCodeRunner from '../{hooks}/useCodeRunner' // Путь до вашего хука

const CodeEditor = ({ id, functionName, description }) => {
    const {
        output,
        isRunning,
        isAllTestsPassed,
        runCode,
        logResults,
        checkIfAllTestsPassed,
    } = useCodeRunner(id)

    const [code, setCode] = useState("Ожидайте...")
    const [dataLoaded, setDataLoaded] = useState(false)

    useEffect(() => {
        if (description && functionName) {
            setCode(`// ${description}\nfunction ${functionName}(num) {\n\n}`) // Исправлено на шаблонную строку
            setDataLoaded(true)
        }
    }, [description, functionName])

    const handleRunCode = async () => {
        const results = await runCode(code)
        if (results.success) {
            checkIfAllTestsPassed(results.results)
            logResults(results.results)
        } else {
            console.error("Ошибка выполнения кода.")
        }
    }

    return (
        <div className="flex flex-col items-center p-6 bg-gray-800 text-white rounded-lg shadow-lg">
            {isAllTestsPassed && <ReactConfetti />}
            <Editor
                value={code}
                onChange={(value) => setCode(value)}
                height="500px"
                width="80vw"
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
                <div className="bg-gray-700 p-4 rounded overflow-y-auto" style={{ maxHeight: '200px' }}>
                    <pre>{output}</pre>
                </div>
            </div>
        </div>
    )
}

export default CodeEditor
