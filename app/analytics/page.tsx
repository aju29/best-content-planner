import { getAnalyticsPendingTasks, getProjects } from '@/lib/supabase'
import AnalyticsUploadButton from '@/components/AnalyticsUploadButton'
import NotesField from './NotesField'

export const dynamic = 'force-dynamic'

export default async function AnalyticsPage() {
  const [tasks, projects] = await Promise.all([
    getAnalyticsPendingTasks(),
    getProjects(),
  ])
  const projectMap = Object.fromEntries(projects.map((p) => [p.id, p]))

  return (
    <main className="text-gray-900 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-gray-500 mt-1">
            Done tasks older than 5 days without a screenshot —{' '}
            <span className="font-semibold text-gray-700">{tasks.length} pending</span>
          </p>
        </div>

        {tasks.length === 0 ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
            <p className="text-2xl mb-2">🎉</p>
            <p className="font-semibold text-green-800">All caught up!</p>
            <p className="text-green-600 text-sm mt-1">No screenshots pending.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-left">
                  <th className="px-5 py-3 font-semibold text-gray-600">Title</th>
                  <th className="px-5 py-3 font-semibold text-gray-600">Project</th>
                  <th className="px-5 py-3 font-semibold text-gray-600">Completed</th>
                  <th className="px-5 py-3 font-semibold text-gray-600">Screenshot</th>
                  <th className="px-5 py-3 font-semibold text-gray-600">Video Context & Notes</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => {
                  const project = projectMap[task.project_id]
                  const daysAgo = task.completed_at
                    ? Math.floor((Date.now() - new Date(task.completed_at).getTime()) / (1000 * 60 * 60 * 24))
                    : null

                  return (
                    <tr key={task.id} className="border-b border-gray-100 last:border-0 align-top">
                      <td className="px-5 py-4 font-medium text-gray-900 max-w-[200px]">
                        {task.title}
                      </td>
                      <td className="px-5 py-4">
                        {project ? (
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: project.color }} />
                            <span className="text-gray-600 whitespace-nowrap">{project.name}</span>
                          </span>
                        ) : '—'}
                      </td>
                      <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                        {task.completed_at ? (
                          <span>
                            {new Date(task.completed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            <span className="ml-1.5 text-xs text-amber-600 font-medium">{daysAgo}d ago</span>
                          </span>
                        ) : '—'}
                      </td>
                      <td className="px-5 py-4">
                        <AnalyticsUploadButton taskId={task.id} />
                      </td>
                      <td className="px-5 py-4">
                        <NotesField taskId={task.id} initialValue={task.analytics_notes} />
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
