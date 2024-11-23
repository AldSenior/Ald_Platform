'use client';
import {useParams} from 'next/navigation';
import CodeEditor from "../../components/CodeEditor";
import {useState, useEffect} from "react";
import {Disclosure} from '@headlessui/react';

const AccordionItem = ({title, children}) => {
    return (
        <Disclosure as="div" className="mb-4">
            {({open}) => (
                <>
                    <Disclosure.Button
                        className={`w-full px-4 py-2 text-left font-medium ${open ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-100'}`}>
                        {title}
                    </Disclosure.Button>
                    <Disclosure.Panel className="p-4 bg-white border border-blue-500 rounded-lg shadow-md">
                        {children}
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};

const PageId = () => {
    // Ваши состояния и эффекты здесь...
    const {id} = useParams();
    const [functionName, setFunctionName] = useState('');
    const [description, setDescription] = useState('');
    const [theory, setTheory] = useState('');
    const [hints, setHints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAccordionOpen, setIsAccordionOpen] = useState(true); // состояние для аккордеона


    useEffect(() => {
        const fetchFunctionDetails = async () => {
            try {
                const response = await fetch(`/api/getFunctionDetails/${id}`);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`${errorData.error} Не удалось загрузить данные`);
                }

                const data = await response.json();
                setFunctionName(data.functionName);
                setDescription(data.description);
                setTheory(data.theory || '');
                setHints(data.hints || []);
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
        return <div className="text-red-500">Ошибка: {error.message}</div>;
    }

    return (
        <div className="w-full h-screen bg-white flex ">
            <div className="flex-1 overflow-y-auto mr-2">
                {loading ? (
                    <p className="text-gray-500">Загрузка...</p>
                ) : (
                    <CodeEditor id={id} functionName={functionName} description={description} hints={hints}/>
                )}
            </div>

            <div className="w-1/3 bg-gray-200 p-4 rounded-lg">
                <AccordionItem title="Описание задачи">
                    <p>{description}</p>
                </AccordionItem>
                <AccordionItem title="Теория">
                    <p>{theory}</p>
                </AccordionItem>
                <AccordionItem title="Подсказки">
                {hints.map((hint, index) => (
                    <AccordionItem key={index} title={`Подсказка ${index + 1}`}>
                        <p>{hint}</p>
                    </AccordionItem>
                ))}
                </AccordionItem>
            </div>
        </div>
    );
};

export default PageId;
