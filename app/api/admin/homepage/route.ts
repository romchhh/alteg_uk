import { NextRequest, NextResponse } from 'next/server';
import { getHomepageSettings, saveHomepageSettings } from '@/lib/data/homepage';

export async function GET() {
  try {
    const settings = await getHomepageSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching homepage:', error);
    return NextResponse.json(
      { error: 'Failed to fetch homepage settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    await saveHomepageSettings(body);
    const settings = await getHomepageSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error updating homepage:', error);
    return NextResponse.json(
      { error: 'Failed to update homepage settings' },
      { status: 500 }
    );
  }
}
