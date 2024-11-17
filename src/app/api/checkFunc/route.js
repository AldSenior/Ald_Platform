import { NextResponse } from 'next/server';

export async function POST(request) {
    // Получаем тело запроса из JSON
    const { code } = await request.json();
    // Проверка наличия кода функции
    if (!code) {
        return NextResponse.json({ error: 'Необходимо передать код функции.' }, { status: 400 });
    }

    let isEvenFunction;

    try {
        // Создание функции из кода пользователя
        isEvenFunction = new Function('num', code + ' return isEven(num);');
    } catch (error) {
        return NextResponse.json({ error: 'Ошибка в синтаксисе функции: ' + error.message }, { status: 400 });
    }

    // Тестовые случаи
    const testCases = [
        { input: 2, expected: true },
        { input: 3, expected: false },
        { input: 0, expected: true },
        { input: -2, expected: true },
        { input: -3, expected: false },
    ];

    const results = testCases.map(({ input, expected }) => {
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

    // Возвращаем результаты в ответе
    return NextResponse.json(results);
}
