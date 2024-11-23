import Link from "next/link"
import { useEffect, useState } from "react"

const TaskCard = ({ title, description, completed, difficulty, id }) => {
    const colorMap = {
        easy: 'bg-green-500',
        medium: 'bg-yellow-500',
        hard: 'bg-red-500'
    }

    return (
        <div className="relative w-full max-w-sm h-72 mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
            <div className={`absolute top-4 right-4 text-sm text-white font-semibold py-1 px-2 rounded ${colorMap[difficulty]}`}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </div>
            <div className="flex-1 flex flex-col p-6">
                <h2 className="text-xl font-semibold text-gray-200 mb-2">{title}</h2>
                <p className="text-base text-gray-400 mb-4 flex-grow overflow-y-auto">{description}</p>
                <span className={`text-sm font-semibold py-1 px-2 rounded ${completed ? 'bg-green-600 text-white' : 'bg-red-600 text-white'} mb-4`}>
                    {completed ? '✅ Выполнено' : '❌ Не выполнено'}
                </span>
            </div>
            <Link href={`/tasks/${id}`}>
                <div className="px-4 py-2 text-sm text-white bg-blue-600 rounded-b-lg hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 text-center">
                    Начать
                </div>
            </Link>
        </div>
    )
}

const TaskList = () => {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch('/api/tasks')
            if (!response.ok) {
                throw new Error('Ошибка при загрузке тестов')
            }
            const data = await response.json()
            setTasks(Object.entries(data).map(([key, value]) => ({ id: key, ...value })))
        }

        fetchTasks().catch(err => {
            console.error(err)
        })
    }, [])


    return (
        <div className="w-1/2 mx-auto pt-10">
            <h1 className="text-3xl font-bold text-white text-center mb-6">Задачи по JavaScript</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.length > 0 ? (

                    tasks.map((task, id) => (
                        <TaskCard
                            key={id}
                            title={task.functionName}
                            description={task.description}
                            difficulty={task.difficulty}
                            id={task.id}
                            completed={task.completed}
                        />
                    ))

                ) : (<p className="text-center text-gray-500">Загрузка задач...</p>)}
            </div>
        </div>
    )
}

export default TaskList
