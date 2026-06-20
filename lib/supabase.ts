import { createClient } from '@supabase/supabase-js'
import type { Project, Task, Comment, TaskStatus } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('name')
  if (error) throw error
  return data ?? []
}

export async function getTasks({
  projectId,
  status,
}: {
  projectId?: string
  status?: string
} = {}): Promise<Task[]> {
  let query = supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false })

  if (projectId) query = query.eq('project_id', projectId)
  if (status) query = query.eq('status', status)

  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

export async function getPublishedTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .not('published_url', 'is', null)
    .order('completed_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function getTaskById(id: string): Promise<Task | null> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .single()
  if (error) return null
  return data
}

export async function getCommentsByTaskId(taskId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('task_id', taskId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function updateTask(
  id: string,
  patch: Partial<Omit<Task, 'id' | 'created_at'>>
): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function addComment(
  taskId: string,
  authorName: string,
  body: string
): Promise<Comment> {
  const { data, error } = await supabase
    .from('comments')
    .insert({ task_id: taskId, author_name: authorName, body })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteTask(id: string): Promise<void> {
  const { error } = await supabase.from('tasks').delete().eq('id', id)
  if (error) throw error
}

export async function createTask(input: {
  project_id: string
  title: string
  channel?: string | null
  content_type?: string | null
  assigned_to?: string | null
  due_date?: string | null
  brief?: string | null
  script?: string | null
  instructions?: string | null
  reference_links?: string | null
}): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .insert({ ...input, status: 'pending' })
    .select()
    .single()
  if (error) throw error
  return data
}
