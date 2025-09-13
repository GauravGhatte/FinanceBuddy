import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const lessonsPath = path.join(process.cwd(), 'data', 'lessons.json');
    const lessonsData = fs.readFileSync(lessonsPath, 'utf8');
    const lessons = JSON.parse(lessonsData);
    
    const lesson = lessons.find((l: any) => l.id === params.id);
    
    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }
    
    return NextResponse.json(lesson);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch lesson' }, { status: 500 });
  }
}
