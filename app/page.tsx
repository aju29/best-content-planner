import Link from 'next/link'
import { getProjects, getTasks } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  const [projects, tasks] = await Promise.all([getProjects(), getTasks()])

  return (
    <main className="text-gray-900 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Content Planner</h1>
            <p className="text-gray-500 mt-1">All projects at a glance</p>
          </div>
          <Link
            href="/tasks/new"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            + New Task
          </Link>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => {
            const projectTasks = tasks.filter(t => t.project_id === project.id)
            const pending = projectTasks.filter(t => t.status === 'pending').length
            const inProgress = projectTasks.filter(t => t.status === 'in_progress').length
            const review = projectTasks.filter(t => t.status === 'review').length
            const done = projectTasks.filter(t => t.status === 'done').length

            return (
              <div
                key={project.id}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: project.color }}
                  />
                  <h2 className="font-semibold text-lg">{project.name}</h2>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  <Link href={`/tasks?project=${project.id}&status=pending`} className="text-red-500 font-semibold hover:underline">⏳ {pending} pending</Link>
                  <Link href={`/tasks?project=${project.id}&status=in_progress`} className="text-gray-500 hover:text-gray-800 hover:underline">🔄 {inProgress} in progress</Link>
                  <Link href={`/tasks?project=${project.id}&status=review`} className="text-gray-500 hover:text-gray-800 hover:underline">👀 {review} review</Link>
                  <Link href={`/tasks?project=${project.id}&status=done`} className="text-gray-500 hover:text-gray-800 hover:underline">✅ {done} done</Link>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </main>
  )
}