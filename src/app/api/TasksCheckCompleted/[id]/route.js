import fs from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

// Обработчик PUT-запроса
export async function PUT(request, { params }) {
    const { id } = params // Извлекаем ID задачи из параметров

    if (!id) {
        return NextResponse.json({ error: 'ID задачи не указан.' }, { status: 400 })
    }

    // Путь к файлу с данными задач
    const tasksPath = path.join(process.cwd(), './src/app/tests.json')

    try {
        // Читаем файл с задачами
        const fileContents = fs.readFileSync(tasksPath, 'utf8')
        const allTasks = JSON.parse(fileContents)

        // Проверяем существование задачи
        const taskIndex = allTasks.findIndex(task => task.id === Number(id))
        if (taskIndex === -1) {
            return NextResponse.json({ error: 'Задача не найдена.' }, { status: 404 })
        }

        const { completed } = await request.json()

        // Обновляем статус задачи
        allTasks[taskIndex].completed = completed


        fs.writeFileSync(tasksPath, JSON.stringify(allTasks, null, 2))

        return NextResponse.json(allTasks[taskIndex])
    } catch (error) {
        return NextResponse.json({ error: 'Ошибка при чтении файла: ' + error.message }, { status: 500 })
    }
}
