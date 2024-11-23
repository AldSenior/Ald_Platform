'use client'
import { useEffect, useState } from 'react'
import Test from '../components/Test'

const QuizPage = () => {
    const [testData, setTestData] = useState([])

    useEffect(() => {
        const fetchTest = async () => {
            const response = await fetch('/api/tests')
            if (!response.ok) {
                throw new Error('Ошибка при загрузке уроков')
            }
            const data = await response.json()
            setTestData(data)
        }

        fetchTest().catch(err => {
            console.error(err)
        })
    }, [])

    return (
        <div className="max-w-7xl mx-auto flex flex-col justify-center pt-10">
            <h1 className="text-4xl font-bold text-center mb-8 text-white">Тесты по JavaScript</h1>
            {testData.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testData.map((lesson) => (
                        <Test test={lesson} key={lesson.id} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">Загрузка тестов...</p>
            )}
        </div>
    )
}

export default QuizPage
