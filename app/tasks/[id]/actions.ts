'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { updateTask, addComment, deleteTask } from '@/lib/supabase'
import type { TaskStatus } from '@/lib/types'

const VALID_STATUSES: TaskStatus[] = ['pending', 'in_progress', 'review', 'done']

export async function updateStatusAction(taskId: string, status: TaskStatus) {
  if (!VALID_STATUSES.includes(status)) return
  await updateTask(taskId, {
    status,
    completed_at: status === 'done' ? new Date().toISOString() : null,
  })
  revalidatePath(`/tasks/${taskId}`)
}

export async function updateCompletionAction(formData: FormData) {
  const taskId = formData.get('taskId') as string
  const published_url = (formData.get('published_url') as string)?.trim() || null
  const completion_notes = (formData.get('completion_notes') as string)?.trim() || null
  if (!taskId) return
  await updateTask(taskId, { published_url, completion_notes })
  revalidatePath(`/tasks/${taskId}`)
}

export async function deleteTaskAction(taskId: string) {
  await deleteTask(taskId)
  redirect('/tasks')
}

export async function addCommentAction(formData: FormData) {
  const taskId = formData.get('taskId') as string
  const author_name = (formData.get('author_name') as string)?.trim()
  const body = (formData.get('body') as string)?.trim()
  if (!taskId || !author_name || !body) return
  await addComment(taskId, author_name, body)
  revalidatePath(`/tasks/${taskId}`)
}
