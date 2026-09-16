'use server';

import { updateContent, createContent, archiveContent, getContentById } from '@/lib/content.js';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function saveContentAction(formData) {
  const id = formData.get('id');
  
  // Extract project-specific metadata
  const meta_process = formData.get('meta_process');
  const meta_technical = formData.get('meta_technical');
  const meta_lessons = formData.get('meta_lessons');
  
  let existingMetadata = {};
  if (id && id !== 'new') {
    const existing = await getContentById(parseInt(id, 10));
    if (existing && existing.metadata) {
      existingMetadata = existing.metadata;
    }
  }

  // Merge new metadata with existing
  const metadata = {
    ...existingMetadata
  };
  
  // Only add if they exist in formData (so we don't wipe out other metadata if it's not a project)
  if (meta_process !== null) metadata.process = meta_process;
  if (meta_technical !== null) metadata.technical = meta_technical;
  if (meta_lessons !== null) metadata.lessons = meta_lessons;

  const rawDate = formData.get('date');
  let date = rawDate ? new Date(rawDate) : new Date();
  if (isNaN(date.getTime())) {
    date = new Date();
  }

  const data = {
    title: formData.get('title') || 'Untitled',
    slug: formData.get('slug') || `untitled-${Date.now()}`,
    type: formData.get('type') || 'note',
    status: formData.get('status') || 'draft',
    excerpt: formData.get('excerpt') || '',
    body: formData.get('body') || '',
    date: date,
    hero_image: formData.get('hero_image') || '',
    source: formData.get('source') || 'native',
    external_id: formData.get('external_id') || '',
    featured: formData.get('featured') === 'on',
    display_order: parseInt(formData.get('display_order') || '0', 10),
    metadata
  };

  try {
    if (id === 'new') {
      await createContent(data);
    } else {
      await updateContent(parseInt(id, 10), data);
    }

    revalidatePath('/');
    revalidatePath('/control');
    revalidatePath('/control/content');
  } catch (error) {
    console.error('Error saving content:', error);
    throw new Error('Failed to save content: ' + error.message);
  }

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
