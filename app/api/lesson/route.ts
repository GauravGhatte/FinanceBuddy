import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const lessonsPath = path.join(process.cwd(), 'data', 'lessons.json');
    const lessonsData = fs.readFileSync(lessonsPath, 'utf8');
    const lessons = JSON.parse(lessonsData);
    
    return NextResponse.json(lessons);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch lessons' }, { status: 500 });
  }
}
