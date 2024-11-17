'use client'
import CodeEditor from './components/CodeEditor';
import React from 'react';

const Home = () => {
    return (
        <div>
            <h1>Интерактивный редактор кода</h1>
            <CodeEditor />
            {/* Дополнительные элементы интерфейса */}
        </div>
    );
};

export default Home;
