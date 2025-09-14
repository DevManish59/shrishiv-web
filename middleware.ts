import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Valid categories and their subcategories
const validCategories = {
  men: ['shirts', 'trousers', 'jeans', 'jackets', 'accessories'],
  women: ['dresses', 'tops', 'skirts', 'jeans', 'accessories'],
  kids: ['shirts', 'dresses', 'trousers', 'accessories'],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle shop routes
  if (pathname.startsWith('/men/') || pathname.startsWith('/women/') || pathname.startsWith('/kids/')) {
    // Extract category and subcategory from path
    const pathParts = pathname.split('/').filter(Boolean);
    
    if (pathParts.length === 2) {
      const category = pathParts[0];
      const subcategory = pathParts[1];

      // Check if category is valid
      if (!validCategories[category as keyof typeof validCategories]) {
        return NextResponse.redirect(new URL('/', request.url));
      }

      // Check if subcategory is valid for this category
      const validSubcategories = validCategories[category as keyof typeof validCategories];
      if (!validSubcategories.includes(subcategory)) {
        return NextResponse.redirect(new URL('/', request.url));
      }

      // Valid category/subcategory combination, allow the request
      return NextResponse.next();
    }

    // Invalid path structure, redirect to home
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Handle category-only routes (redirect to home since we don't want category pages)
  if (pathname === '/men' || pathname === '/women' || pathname === '/kids') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/men/:path*',
    '/women/:path*',
    '/kids/:path*',
  ],
}; 