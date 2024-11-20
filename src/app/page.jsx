import Link from "next/link";

const HomePage = () => {
        return (
            <>
                <section className="py-20 text-center">
                    <h2 className="text-5xl font-bold mb-4">Учитесь программированию с нами!</h2>
                    <p className="text-lg mb-6 max-w-xl mx-auto">
                        Начните ваш путь к успеху в программировании. Найдите курсы, которые подходят вам, и погружайтесь в
                        мир
                        технологий!
                    </p>
                    <Link
                        href="/courses"
                        className="inline-block px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition"
                    >
                        Начать обучение
                    </Link>
                </section>

                <section className="py-20 bg-gray-800">
                    <h3 className="text-4xl text-center mb-8">Почему выбирают нас?</h3>
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                            <h4 className="text-xl font-bold mb-2">Высококачественные курсы</h4>
                            <p>Наши курсы созданы опытными специалистами в своей области, и они помогут вам освоить
                                необходимые
                                навыки.</p>
                        </div>
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                            <h4 className="text-xl font-bold mb-2">Поддержка сообщества</h4>
                            <p>Присоединяйтесь к нашему сообществу, общайтесь с единомышленниками и находите поддержку на
                                своем
                                пути.</p>
                        </div>
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                            <h4 className="text-xl font-bold mb-2">Гибкий график</h4>
                            <p>Учитесь в удобное для вас время и в своем темпе. Наша платформа доступна 24/7!</p>
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <h3 className="text-4xl text-center mb-8">Наши курсы</h3>
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                            <h4 className="text-xl font-bold mb-2">Введение в JavaScript</h4>
                            <p>Научитесь основам JavaScript и создайте свои первые проекты.</p>
                            <Link
                                href="/courses/javascript"
                                className="mt-4 inline-block bg-green-600 text-center rounded-lg px-4 py-2 hover:bg-green-700
                transition"
                            >
                                Узнать больше
                            </Link>
                        </div>
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                            <h4 className="text-xl font-bold mb-2">Frontend-разработка</h4>
                            <p>Изучите основы HTML, CSS и JavaScript и создайте современные веб-приложения.</p>
                            <Link
                                href="/courses/frontend"
                                className="mt-4 inline-block bg-green-600 text-center rounded-lg px-4 py-2 hover:bg-green-700 transition"
                            >
                                Узнать больше
                            </Link>
                        </div>
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                            <h4 className="text-xl font-bold mb-2">Backend-разработка</h4>
                            <p>Погрузитесь в мир серверного программирования и узнайте, как создавать API.</p>
                            <Link
                                href="/courses/backend"
                                className="mt-4 inline-block bg-green-600 text-center rounded-lg px-4 py-2 hover:bg-green-700 transition"
                            >
                                Узнать больше
                            </Link>
                        </div>
                    </div>
                </section>

{/* Подвал */
}
                <footer className="bg-gray-800 text-center text-white py-6">
                    <p>© 2023 MyCodingSite. Все права защищены.</p>
                    <Link href="/privacy" className="text-gray-400 hover:underline">Политика конфиденциальности</Link>
                </footer>
            </>
        )
            ;
    }
;

export default HomePage;
