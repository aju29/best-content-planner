export type Project = {
  id: string
  name: string
  color: string
  created_at: string
}

export type TaskStatus = 'pending' | 'in_progress' | 'review' | 'done'

export type Task = {
  id: string
  project_id: string
  title: string
  channel: string | null
  content_type: string | null
  status: TaskStatus
  assigned_to: string | null
  due_date: string | null
  brief: string | null
  script: string | null
  instructions: string | null
  reference_links: string | null
  published_url: string | null
  completion_notes: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
}

export type Comment = {
  id: string
  task_id: string
  author_name: string
  body: string
  created_at: string
}
