import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
    const { id } = await params; // Извлекаем ID из параметров

    if (!id) {
        return NextResponse.json({ error: 'ID функции не указан.' }, { status: 400 });
    }

    // Путь к файлу с данными функций
    const functionsPath = path.join(process.cwd(), './src/app/tests.json');

    try {
        const fileContents = fs.readFileSync(functionsPath, 'utf8');
        const allFunctions = JSON.parse(fileContents);
        const functionDetails = allFunctions[id]; // Получаем данные по ID

        if (!functionDetails) {
            return NextResponse.json({ error: 'Функция не найдена.' }, { status: 404 });
        }

        return NextResponse.json({
            functionName: functionDetails.functionName,
            description: functionDetails.description,
            theory: functionDetails.theory,
            hints: functionDetails.hints
        });
    } catch (error) {
        return NextResponse.json({ error: 'Ошибка при чтении файла: ' + error.message }, { status: 500 });
    }
};
