import { NextRequest, NextResponse } from 'next/server';

import { searchSupplierParts } from '@/shared/lib/services';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.trim() ?? '';

  if (!query) {
    return NextResponse.json({ error: 'Missing query parameter "q".' }, { status: 400 });
  }

  const result = await searchSupplierParts(query);
  return NextResponse.json(result);
}
