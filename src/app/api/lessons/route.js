import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    // Путь к вашему json файлу
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

    return NextResponse.json(lessonsData);
}
