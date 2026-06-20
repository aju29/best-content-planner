import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTaskById, getCommentsByTaskId, getProjects } from '@/lib/supabase'
import { updateCompletionAction } from './actions'
import StatusUpdater from './StatusUpdater'
import CommentSection from './CommentSection'
import DeleteButton from './DeleteButton'
import AnalyticsUploadButton from '@/components/AnalyticsUploadButton'
import type { TaskStatus } from '@/lib/types'

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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{title}</h2>
      <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">{children}</div>
    </div>
  )
}

const inputClass =
  'w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white'

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [task, comments, projects] = await Promise.all([
    getTaskById(id),
    getCommentsByTaskId(id),
    getProjects(),
  ])

  if (!task) notFound()

  const project = projects.find((p) => p.id === task.project_id)
  const isOverdue = task.due_date && task.status !== 'done' && new Date(task.due_date) < new Date()

  return (
    <main className="text-gray-900 p-8">
      <div className="max-w-2xl mx-auto">

        {/* Back + actions */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/tasks"
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← Back to Tasks
          </Link>
          <div className="flex items-center gap-1">
            <Link
              href={`/tasks/${task.id}/edit`}
              className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Edit
            </Link>
            <DeleteButton taskId={task.id} />
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 flex-wrap">
            {project && (
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.color }} />
                {project.name}
              </span>
            )}
            {task.channel && <><span className="text-gray-300">·</span><span>{task.channel}</span></>}
            {task.content_type && <><span className="text-gray-300">·</span><span>{task.content_type}</span></>}
          </div>

          <h1 className="text-3xl font-bold mb-3">{task.title}</h1>

          <div className="flex items-center gap-3 flex-wrap">
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[task.status]}`}>
              {STATUS_LABELS[task.status]}
            </span>
            {task.assigned_to && (
              <span className="text-sm text-gray-500">→ {task.assigned_to}</span>
            )}
            {task.due_date && (
              <span className={`text-sm ${isOverdue ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
                {isOverdue ? '⚠ Overdue · ' : 'Due '}
                {new Date(task.due_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            )}
          </div>
        </div>

        {/* Content sections */}
        {(task.brief || task.script || task.instructions || task.reference_links) && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6 mb-6">
            {task.brief && <Section title="Brief">{task.brief}</Section>}
            {task.script && <Section title="Script">{task.script}</Section>}
            {task.instructions && <Section title="Instructions">{task.instructions}</Section>}
            {task.reference_links && (
              <Section title="Reference Links">
                {task.reference_links.split('\n').map((url, i) => {
                  const trimmed = url.trim()
                  if (!trimmed) return null
                  return (
                    <a
                      key={i}
                      href={trimmed}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-indigo-600 hover:underline text-sm break-all"
                    >
                      {trimmed}
                    </a>
                  )
                })}
              </Section>
            )}
          </div>
        )}

        {/* Status + Completion */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6 mb-6">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Update Status</h2>
            <StatusUpdater taskId={task.id} current={task.status} />
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Completion</h2>
            <form action={updateCompletionAction} className="space-y-3">
              <input type="hidden" name="taskId" value={task.id} />
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">Published URL</label>
                <input
                  name="published_url"
                  type="url"
                  placeholder="https://…"
                  defaultValue={task.published_url ?? ''}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">Completion Notes</label>
                <textarea
                  name="completion_notes"
                  rows={3}
                  placeholder="Anything to note about this task…"
                  defaultValue={task.completion_notes ?? ''}
                  className={`${inputClass} resize-none`}
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Save
              </button>
            </form>
          </div>

          {task.completed_at && (
            <p className="text-xs text-gray-400">
              Completed {new Date(task.completed_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          )}

          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Analytics Screenshot</h2>
            <AnalyticsUploadButton taskId={task.id} currentUrl={task.analytics_screenshot} />
          </div>
        </div>

        {/* Comments */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <CommentSection taskId={task.id} comments={comments} />
        </div>

      </div>
    </main>
  )
}
