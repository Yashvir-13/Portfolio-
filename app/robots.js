export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yashvirafterhours.me';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/control',
          '/control/*',
          '/api',
          '/api/*',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/control',
          '/control/*',
          '/api',
          '/api/*',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
