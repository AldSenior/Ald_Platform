'use client'
import { useParams } from 'next/navigation';
import CodeEditor from "../../../components/CodeEditor";
import React from "react";

const PageId = () => {
    const { id } = useParams(); // Получаем ID из параметров маршрута

    return (
        <div>
            <CodeEditor id={id} />
        </div>
    );
};

export default PageId;
