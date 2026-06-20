import Link from 'next/link'
import { getPublishedTasks, getProjects } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export default async function VideosPage() {
  const [tasks, projects] = await Promise.all([getPublishedTasks(), getProjects()])
  const projectMap = Object.fromEntries(projects.map((p) => [p.id, p]))

  return (
    <main className="text-gray-900 p-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Completed Videos</h1>
          <p className="text-gray-500 mt-1">
            {tasks.length} published video{tasks.length !== 1 ? 's' : ''} — click any URL to open
          </p>
        </div>

        {tasks.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            No published videos yet. Add a Published URL on any task to see it here.
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-left">
                  <th className="px-5 py-3 font-semibold text-gray-600">#</th>
                  <th className="px-5 py-3 font-semibold text-gray-600">Title</th>
                  <th className="px-5 py-3 font-semibold text-gray-600">Project</th>
                  <th className="px-5 py-3 font-semibold text-gray-600">Channel</th>
                  <th className="px-5 py-3 font-semibold text-gray-600">Published URL</th>
                  <th className="px-5 py-3 font-semibold text-gray-600">Completed</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, i) => {
                  const project = projectMap[task.project_id]
                  return (
                    <tr
                      key={task.id}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-5 py-3.5 text-gray-400">{i + 1}</td>
                      <td className="px-5 py-3.5">
                        <Link
                          href={`/tasks/${task.id}`}
                          className="font-medium text-gray-900 hover:text-indigo-600 transition-colors"
                        >
                          {task.title}
                        </Link>
                      </td>
                      <td className="px-5 py-3.5">
                        {project ? (
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: project.color }} />
                            <span className="text-gray-600">{project.name}</span>
                          </span>
                        ) : '—'}
                      </td>
                      <td className="px-5 py-3.5 text-gray-600">{task.channel ?? '—'}</td>
                      <td className="px-5 py-3.5 max-w-xs">
                        <a
                          href={task.published_url!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:underline break-all"
                        >
                          {task.published_url}
                        </a>
                      </td>
                      <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">
                        {task.completed_at
                          ? new Date(task.completed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                          : '—'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </main>
  )
}
