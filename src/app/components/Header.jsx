import Link from "next/link";

export const Header = () => {

    return (
        <header className="flex justify-between items-center p-4 bg-[#020202] text-white">
            <div className="text-2xl font-bold">
                <Link href="/">MyCodingSite</Link>
            </div>
            <nav className="flex space-x-4">
                <Link href="/lessons" className="hover:underline">Уроки</Link>
                <Link href="/tasks" className="hover:underline">Задачи</Link>
                <Link href="/lessons" className="hover:underline">Тесты</Link>
                <Link href="/community" className="hover:underline">Сообщество</Link>
                <Link href="/profile" className="hover:underline">Профиль</Link>

            </nav>
            <div className="flex items-center">
                <input type="text" placeholder="Поиск..." className="p-2 rounded-lg"/>
                <button className="ml-2 bg-green-600 p-2 rounded-lg">Начать обучение</button>
            </div>
        </header>

    )
}

