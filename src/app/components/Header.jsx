import Link from "next/link";

export const Header = () => {
    return (
        <header className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-md">
            <div className="text-3xl font-bold">
                <Link href="/">MyCodingSite</Link>
            </div>
            <nav className="flex space-x-8">
                <Link href="/lessons" className="hover:underline hover:text-green-400 transition">
                    Уроки
                </Link>
                <Link href="/tasks" className="hover:underline hover:text-green-400 transition">
                    Задачи
                </Link>
                <Link href="/tests" className="hover:underline hover:text-green-400 transition">
                    Тесты
                </Link>
                <Link href="/community" className="hover:underline hover:text-green-400 transition">
                    Сообщество
                </Link>
                <Link href="/profile" className="hover:underline hover:text-green-400 transition">
                    Профиль
                </Link>
            </nav>
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Поиск..."
                    className="p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button className="ml-4 bg-green-600 p-2 rounded-lg transition duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300">
                    Начать обучение
                </button>
            </div>
        </header>
    );
};
