import Link from "next/link";

const TaskCard = ({title, description, difficulty, onClick, id, completed}) => {
    return (
        <div className="w-1/4 bg-white shadow-md rounded-lg p-4 m-2  hover:shadow-lg" onClick={onClick}>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-gray-600 h-[72px]">{description}</p>
            <p className={`text-sm ${completed ? 'text-green-500' : 'text-red-500'}`}>{completed ? "Выполнено" : "Не выполнено"}</p>
            <Link href={`/tests/${id}`}>
                <button
                    className={`inline-block text-center px-2 py-1 mt-2 text-sm text-white rounded ${difficulty === 'easy' ? 'bg-green-500' : difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                    <p className="text-center">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</p>
                </button>
            </Link>
        </div>
    );
};
import tasks from "../tests.json"

const TaskList = () => {
    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Задачи по JavaScript</h1>
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
