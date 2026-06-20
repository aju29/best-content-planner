import Link from 'next/link'
import { Suspense } from 'react'
import { getProjects, getTasks } from '@/lib/supabase'

export const dynamic = 'force-dynamic'
import type { Task, Project, TaskStatus } from '@/lib/types'
import TaskFilters from './TaskFilters'

const STATUS_STYLES: Record<TaskStatus, string> = {
  pending: 'bg-gray-100 text-gray-600',
  in_progress: 'bg-blue-100 text-blue-700',
  review: 'bg-amber-100 text-amber-700',
  done: 'bg-green-100 text-green-700',
}

const STATUS_LABELS: Record<TaskStatus, string> = {
  pending: 'Pending',
  in_progress: 'In Progress',
  review: 'Review',
  done: 'Done',
}

function TaskCard({ task, project }: { task: Task; project: Project | undefined }) {
  const isOverdue =
    task.due_date &&
    task.status !== 'done' &&
    new Date(task.due_date) < new Date()

  return (
    <Link href={`/tasks/${task.id}`}>
      <div className="rounded-xl border border-gray-200 bg-white p-5 hover:border-gray-400 transition-colors cursor-pointer shadow-sm">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-semibold text-gray-900 leading-snug">{task.title}</h3>
          <span
            className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[task.status]}`}
          >
            {STATUS_LABELS[task.status]}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
          {project && (
            <span className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: project.color }}
              />
              {project.name}
            </span>
          )}
          {task.channel && <span>{task.channel}</span>}
          {task.content_type && <span>{task.content_type}</span>}
          {task.assigned_to && <span>→ {task.assigned_to}</span>}
          {task.due_date && (
            <span className={isOverdue ? 'text-red-400' : ''}>
              {isOverdue ? '⚠ ' : ''}
              {new Date(task.due_date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default async function TasksPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string; status?: string }>
}) {
  const { project: projectId, status } = await searchParams

  const [projects, tasks] = await Promise.all([
    getProjects(),
    getTasks({ projectId, status }),
  ])

  const projectMap = Object.fromEntries(projects.map((p) => [p.id, p]))

  return (
    <main className="text-gray-900 p-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Tasks</h1>
            <p className="text-gray-500 mt-1">
              {tasks.length} task{tasks.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Link
            href="/tasks/new"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
          >
            + New Task
          </Link>
        </div>

        {/* Filters — needs Suspense because useSearchParams inside */}
        <div className="mb-6">
          <Suspense>
            <TaskFilters projects={projects} />
          </Suspense>
        </div>

        {/* Task list */}
        {tasks.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            No tasks match these filters.
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                project={projectMap[task.project_id]}
              />
            ))}
          </div>
        )}

      </div>
    </main>
  )
}
