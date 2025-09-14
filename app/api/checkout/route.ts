import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

// In a real app, this would be in a database
const checkoutSessions = new Map();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { items, subtotal, userId } = data;

    // Generate a unique session ID
    const sessionId = nanoid();

    // Store session data (in a real app, this would go to a database)
    checkoutSessions.set(sessionId, {
      items,
      subtotal,
      userId,
      createdAt: new Date(),
      status: 'pending'
    });

    // Sessions should expire after some time
    setTimeout(() => {
      checkoutSessions.delete(sessionId);
    }, 1000 * 60 * 30); // 30 minutes

    return NextResponse.json({ sessionId });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');

  if (!sessionId) {
    return NextResponse.json(
      { error: 'Session ID is required' },
      { status: 400 }
    );
  }

  const session = checkoutSessions.get(sessionId);
  if (!session) {
    return NextResponse.json(
      { error: 'Invalid or expired session' },
      { status: 404 }
    );
  }

  return NextResponse.json(session);
} 