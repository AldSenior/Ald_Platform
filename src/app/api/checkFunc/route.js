import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
    const { code, id } = await request.json();

    // Проверка наличия кода функции и id
    if (!code) {
        return NextResponse.json({ error: 'Необходимо передать код функции.' }, { status: 400 });
    }
    if (!id) {
        return NextResponse.json({ error: 'Необходимо передать ID тестов.' }, { status: 400 });
    }

    // Чтение тестов из tests.json
    const testsPath = path.join(process.cwd(), './src/app/tests.json');
    let testCases;

    try {
        const fileContents = fs.readFileSync(testsPath, 'utf8');
        const allTests = JSON.parse(fileContents);
        // Получаем тесты по ID
        testCases = allTests[id];
    } catch (error) {
        return NextResponse.json({ error: 'Ошибка при чтении файла тестов: ' + error.message }, { status: 500 });
    }

    // Проверка существования и корректности testCases
    if (!testCases || !Array.isArray(testCases.tests)) {
        return NextResponse.json({ error: 'Тесты не найдены для указанного ID.' }, { status: 404 });
    }

    const { tests, functionName, description } = testCases;

    // Используем динамическую функцию, передавая код пользователю
    let userFunction;
    try {
        // Создание пользовательской функции
        userFunction = new Function('num', code + ' return ' + functionName + '(num);');
    } catch (error) {
        return NextResponse.json({ error: 'Ошибка в синтаксисе функции: ' + error.message }, { status: 400 });
    }

    const results = tests.map(({ input, expected }) => {
        try {
            // Вызов пользовательской функции с использованием isEven
            const output = userFunction(input);
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

    return NextResponse.json({ results, functionName, description });
}
