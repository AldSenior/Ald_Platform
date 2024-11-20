import React from 'react';
import Link from "next/link";

const Test = ({ test }) => {
    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
            <h2 className="text-2xl font-bold">{test.title}</h2>
            <p className="mt-2">{test.content}</p>
            <Link
                href={`/tests/${test.id}`}
                className="mt-4 inline-block bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition duration-300"
            >
                Пройти тест
            </Link>
        </div>
    );
};

export default Test;
