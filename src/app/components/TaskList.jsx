import Link from "next/link";

const TaskCard = ({ title, description, difficulty, onClick, id, completed }) => {
    return (
        <div
            className="relative w-1/4 bg-[#121212] shadow-md rounded-lg p-4 m-2 hover:shadow-lg hover:scale-105 transition-transform duration-200 flex flex-col justify-between"
            onClick={onClick}
        >
            <div>
                <h3 className="text-lg font-semibold text-center mt-6">{title}</h3>
                <p className="text-gray-400 min-h-[72px]">{description}</p> {/* Используем min-h для описания */}
            </div>
            <div className="mt-2">
                <p className={`text-sm ${completed ? 'text-green-500' : 'text-red-500'}`}>
                    {completed ? "Выполнено" : "Не выполнено"}
                </p>
                <Link href={`/tasks/${id}`}>
                    <button className="w-full inline-block text-center px-2 py-1 text-sm text-white rounded bg-black hover:bg-gray-800 transition-colors duration-200">
                        <p className="text-center">Начать</p>
                    </button>
                </Link>
            </div>

            <span
                className={`absolute top-2 right-2 px-2 py-1 text-sm text-white rounded ${difficulty === 'easy' ? 'bg-green-500' : difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
        </div>
    );
};

import tasks from "../tests.json";

const TaskList = () => {
    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Задачи по JavaScript</h1>
            <div className="flex flex-wrap">
                {Object.entries(tasks).map(([key, task]) => (
                    <TaskCard
                        key={key}
                        title={task.functionName}
                        description={task.description}
                        difficulty={task.difficulty} // Передаем уровень сложности
                        id={key}
                        completed={task.completed}
                    />
                ))}
            </div>
        </div>
    );
};

export default TaskList;

