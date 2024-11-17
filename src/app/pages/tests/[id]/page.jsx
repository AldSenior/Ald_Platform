'use client'
import {useParams} from 'next/navigation';
import CodeEditor from "../../../components/CodeEditor";
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
                        throw new Error('Не удалось загрузить данные');
                    }

                    const data = await response.json();
                    setFunctionName(data.functionName);
                    setDescription(data.description);
                } catch (err) {
                    if (err.type === 'cancelation') {
                        handleLog('Операция отменена: ' + err.msg);
                    }
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            }
            if (id) { // Добавлено условие на случай, если id еще не загружен
                fetchFunctionDetails();
            }
        }, [id]
    )
    ;


    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <div>
            {loading ? <div>Загрузка...</div> :
                <CodeEditor id={id} functionName={functionName} description={description}/>
            } </div>
    )
        ;
};

export default PageId;
