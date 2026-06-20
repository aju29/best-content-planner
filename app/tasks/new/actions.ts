'use server'

import { redirect } from 'next/navigation'
import { createTask } from '@/lib/supabase'

export type FormState = { error: string } | null

function str(formData: FormData, key: string): string | null {
  const val = (formData.get(key) as string)?.trim()
  return val || null
}

export async function createTaskAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const title = str(formData, 'title')
  const project_id = str(formData, 'project_id')

  if (!title) return { error: 'Title is required.' }
  if (!project_id) return { error: 'Project is required.' }

  try {
    await createTask({
      title,
      project_id,
      channel: str(formData, 'channel'),
      content_type: str(formData, 'content_type'),
      assigned_to: str(formData, 'assigned_to'),
      due_date: str(formData, 'due_date'),
      brief: str(formData, 'brief'),
      script: str(formData, 'script'),
      instructions: str(formData, 'instructions'),
      reference_links: str(formData, 'reference_links'),
    })
  } catch {
    return { error: 'Something went wrong. Please try again.' }
  }

  redirect('/tasks')
}
