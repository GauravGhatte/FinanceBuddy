import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const progressPath = path.join(process.cwd(), 'data', 'progress.json');
    const progressData = fs.readFileSync(progressPath, 'utf8');
    const progress = JSON.parse(progressData);
    
    return NextResponse.json(progress);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, lessonId, completed } = body;
    
    const progressPath = path.join(process.cwd(), 'data', 'progress.json');
    const progressData = fs.readFileSync(progressPath, 'utf8');
    let progress = JSON.parse(progressData);
    
    // Check if progress already exists for this user and lesson
    const existingIndex = progress.findIndex(
      (p: any) => p.userId === userId && p.lessonId === lessonId
    );
    
    const newProgress = { userId, lessonId, completed };
    
    if (existingIndex >= 0) {
      progress[existingIndex] = newProgress;
    } else {
      progress.push(newProgress);
    }
    
    fs.writeFileSync(progressPath, JSON.stringify(progress, null, 2));
    
    return NextResponse.json(newProgress);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
  }
}
