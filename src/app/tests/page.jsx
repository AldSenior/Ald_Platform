'use client'
import { useEffect, useState } from 'react';
import Test from '../components/Test';

const HomePage = () => {
    const [testData, setTestData] = useState([]);

    useEffect(() => {
        const fetchtest = async () => {
            const response = await fetch('/api/tests');
            if (!response.ok) {
                throw new Error('Ошибка при загрузке уроков');
            }
            const data = await response.json();
            setTestData(data);
        };

        fetchtest().catch(err => {
            console.error(err); // Логируем ошибку в консоль
        });
    }, []);

    return (
        <div className="max-w-2xl mx-auto pt-10">
            <h1 className="text-3xl font-bold text-center mb-6">Тесты по JavaScript</h1>
            {testData.length > 0 ? (
                testData.map((lesson) => (
                    <Test test={lesson} key={lesson.id} />
                ))
            ) : (
                <p className="text-center text-gray-500">Загрузка тестов...</p>
            )}
        </div>
    );
};

export default HomePage;
