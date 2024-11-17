'use client'
import CodeEditor from './components/CodeEditor';
import React from 'react';

const Home = () => {
    return (
        <div>
           <h1>Home Page</h1>
            <CodeEditor id={1} description="123" functionName="isa"/>
            {/* Дополнительные элементы интерфейса */}
        </div>
    );
};

export default Home;
