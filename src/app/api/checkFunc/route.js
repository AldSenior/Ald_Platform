import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
    const { code, id } = await request.json(); // Добавляем id в запрос
    // Проверка наличия кода функции и id
    if (!code) {
        return NextResponse.json({ error: 'Необходимо передать код функции.' }, { status: 400 });
    }
    if (!id) {
        return NextResponse.json({ error: 'Необходимо передать ID тестов.' }, { status: 400 });
    }

    let isEvenFunction;

    try {
        // Создание функции из кода пользователя
        isEvenFunction = new Function('num', code + ' return isEven(num);');
    } catch (error) {
        return NextResponse.json({ error: 'Ошибка в синтаксисе функции: ' + error.message }, { status: 400 });
    }

    // Чтение тестов из tests.json
    const testsPath = path.join(process.cwd(), './src/app/tests.json');
    let testCases;

    try {
        const fileContents = fs.readFileSync(testsPath, 'utf8');
        const allTests = JSON.parse(fileContents);
        // Получаем тесты по ID
        testCases = allTests[id] || [];
    } catch (error) {
        return NextResponse.json({ error: 'Ошибка при чтении файла тестов: ' + error.message }, { status: 500 });
    }
    const {tests} = testCases
    const results = tests.map(({ input, expected }) => {
        try {
            const output = isEvenFunction(input);
            return {
                input,
                expected,
                output,
                passed: output === expected,
            };
        } catch (error) {
            return {
                input,
                expected,
                output: null,
                passed: false,
                error: error.message,
            };
        }
    });


    return NextResponse.json(results);
}
