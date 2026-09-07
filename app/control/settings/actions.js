'use server';

import { updateSettings } from '@/lib/content.js';
import { revalidatePath } from 'next/cache';

export async function saveSettings(formData) {
  const profile_pic_url = formData.get('profile_pic_url');
  const about_text = formData.get('about_text');
  const cv_url = formData.get('cv_url');
  const email = formData.get('email');

  const settings = {
    profile_pic_url,
    about_text,
    cv_url,
    email
  };

  await updateSettings(settings);
  revalidatePath('/about');
  revalidatePath('/control/settings');
}
