import fs from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

export async function GET() {
    const lessonsPath = path.join(process.cwd(), './src/app/tests.json')
    let lessonsData

    try {
        const fileContents = fs.readFileSync(lessonsPath, 'utf8')
        lessonsData = JSON.parse(fileContents)
    } catch (error) {
        console.error('Ошибка при чтении файла:', error)
        return NextResponse.json({ error: 'Ошибка чтения данных.' }, { status: 500 })
    }

    return NextResponse.json(lessonsData)
}
