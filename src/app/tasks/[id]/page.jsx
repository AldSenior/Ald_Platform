'use client';
import {useParams} from 'next/navigation';
import CodeEditor from "../../components/CodeEditor";
import {useState, useEffect} from "react";

const PageId = () => {
    const {id} = useParams(); // Получаем ID из параметров маршрута
    const [functionName, setFunctionName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFunctionDetails = async () => {
            try {
                const response = await fetch(`/api/getFunctionDetails/${id}`);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Не удалось загрузить данные');
                }

                const data = await response.json();
                setFunctionName(data.functionName);
                setDescription(data.description);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchFunctionDetails();
        }
    }, [id]);

    if (error) {
        return <div>Ошибка: {error.message || JSON.stringify(error)}</div>;
    }

    return (
        <div>
            <CodeEditor id={id} loading={loading} functionName={functionName} description={description}/>
        </div>
    );
};

export default PageId;