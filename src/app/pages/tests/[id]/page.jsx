'use client'
import { useParams } from 'next/navigation';

const PageId = () => {
    const { id } = useParams(); // Получаем ID из параметров маршрута

    return (
        <div>
            <h1>Идентификатор страницы</h1>
            <p>Ваш ID: {id}</p>
        </div>
    );
};

export default PageId;
