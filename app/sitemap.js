import { getPublishedContent, getPublishedContentMultiType } from '@/lib/content.js';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yashvirafterhours.me';
  const currentDate = new Date();

  // Core static pages with their priority and change frequency
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/writing`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/films`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/photography`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/notes`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/not-yet`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  let dynamicRoutes = [];

  try {
    const [projects, writings, films, notes] = await Promise.all([
      getPublishedContent('project', { limit: 100 }),
      getPublishedContentMultiType(['poem', 'fragment', 'essay'], { limit: 100 }),
      getPublishedContent('film', { limit: 100 }),
      getPublishedContent('note', { limit: 100 }),
    ]);

    const projectRoutes = (projects || []).map((item) => ({
      url: `${baseUrl}/work/${item.slug}`,
      lastModified: item.updated_at ? new Date(item.updated_at) : (item.date ? new Date(item.date) : currentDate),
      changeFrequency: 'monthly',
      priority: 0.85,
    }));

    const writingRoutes = (writings || []).map((item) => ({
      url: `${baseUrl}/writing/${item.slug}`,
      lastModified: item.updated_at ? new Date(item.updated_at) : (item.date ? new Date(item.date) : currentDate),
      changeFrequency: 'monthly',
      priority: 0.75,
    }));

    const filmRoutes = (films || []).map((item) => ({
      url: `${baseUrl}/films/${item.slug}`,
      lastModified: item.updated_at ? new Date(item.updated_at) : (item.date ? new Date(item.date) : currentDate),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    const noteRoutes = (notes || []).map((item) => ({
      url: `${baseUrl}/notes/${item.slug}`,
      lastModified: item.updated_at ? new Date(item.updated_at) : (item.date ? new Date(item.date) : currentDate),
      changeFrequency: 'monthly',
      priority: 0.65,
    }));

    dynamicRoutes = [...projectRoutes, ...writingRoutes, ...filmRoutes, ...noteRoutes];
  } catch (error) {
    console.warn('Sitemap dynamic query fallback:', error?.message || error);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
