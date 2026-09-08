'use server';

import { updateContent, createContent, archiveContent } from '@/lib/content.js';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function saveContentAction(formData) {
  const id = formData.get('id');
  
  const data = {
    title: formData.get('title'),
    slug: formData.get('slug'),
    type: formData.get('type'),
    status: formData.get('status'),
    excerpt: formData.get('excerpt'),
    body: formData.get('body'),
    date: formData.get('date') ? new Date(formData.get('date')) : new Date(),
    hero_image: formData.get('hero_image'),
    source: formData.get('source'),
    external_id: formData.get('external_id'),
    featured: formData.get('featured') === 'on',
    display_order: parseInt(formData.get('display_order') || '0', 10)
  };


  if (id === 'new') {
    await createContent(data);
  } else {
    await updateContent(parseInt(id, 10), data);
  }

  revalidatePath('/');
  revalidatePath('/control');
  revalidatePath('/control/content');
  redirect('/control/content?type=' + data.type);
}

export async function archiveContentAction(formData) {
  const id = formData.get('id');
  const type = formData.get('type');
  
  if (id && id !== 'new') {
    await archiveContent(parseInt(id, 10));
  }
  
  revalidatePath('/');
  revalidatePath('/control');
  revalidatePath('/control/content');
  redirect('/control/content?type=' + type);
}
