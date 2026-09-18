import { getPublishedContent } from './lib/content.js';

async function test() {
  const films = await getPublishedContent('film');
  console.log('Films:', JSON.stringify(films, null, 2));
}

test();
