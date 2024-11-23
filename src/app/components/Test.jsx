import Link from "next/link"
import React from 'react'

const Test = ({ test }) => {
    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-4 h-full flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-2">{test.title}</h2>
            <p className="text-gray-300 mt-2 flex-grow">{test.content}</p>
            <div className="mt-auto">
                <Link
                    href={`/tests/${test.id}`}
                    className="block text-center bg-blue-600 text-white rounded-md px-4 py-2 transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    Пройти тест
                </Link>
            </div>
        </div>
    )
}

export default Test
