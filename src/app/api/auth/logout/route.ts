import { NextResponse } from 'next/server';

export async function POST() {

  return NextResponse.json({ message: 'Sikeres kijelentkezés' }, {
    status: 200,
    headers: {
      'Set-Cookie': 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
    },
  });
}
