import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req, { params }) {
    const { id } = params; // Получаем параметр ID из запросов
    const lessonsPath = path.join(process.cwd(), './src/app/lessons.json');
    let lessonsData;

    try {
        // Чтение файла
        const fileContents = fs.readFileSync(lessonsPath, 'utf8');
        lessonsData = JSON.parse(fileContents);
    } catch (error) {
        console.error('Ошибка при чтении файла:', error);
        return NextResponse.json({ error: 'Ошибка чтения данных.' }, { status: 500 });
    }

    // Поиск конкретного урока по ID
    const lesson = lessonsData.find(lesson => lesson.id === parseInt(id)); // Приводим ID к числу

    if (!lesson) {
        return NextResponse.json({ error: 'Урок не найден' }, { status: 404 });
    }

    return NextResponse.json(lesson);
}
