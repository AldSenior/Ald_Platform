'use client'
import { useEffect, useState } from 'react';
import Lesson from '../components/Lesson';

const HomePage = () => {
    const [lessonsData, setLessonsData] = useState([]);

    useEffect(() => {
        const fetchLessons = async () => {
            const response = await fetch('/api/lessons');
            if (!response.ok) {
                throw new Error('Ошибка при загрузке уроков');
            }
            const data = await response.json();
            setLessonsData(data);
        };

        fetchLessons().catch(err => {
            console.error(err); // Логируем ошибку в консоль
        });
    }, []);

    return (
        <div className="max-w-2xl mx-auto pt-10">
            <h1 className="text-3xl font-bold text-center mb-6">Уроки по JavaScript</h1>
            {lessonsData.length > 0 ? (
                lessonsData.map((lesson) => (
                    <Lesson lesson={lesson} key={lesson.id} />
                ))
            ) : (
                <p className="text-center text-gray-500">Загрузка уроков...</p>
            )}
        </div>
    );
};

export default HomePage;
