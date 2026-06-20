import { supabase } from '@/lib/supabase'

export default async function Dashboard() {
  const { data: projects } = await supabase.from('projects').select('*')
  const { data: tasks } = await supabase.from('tasks').select('*')

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Content Planner</h1>
          <p className="text-gray-400 mt-1">All projects at a glance</p>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects?.map((project) => {
            const projectTasks = tasks?.filter(t => t.project_id === project.id) || []
            const done = projectTasks.filter(t => t.status === 'done').length
            const pending = projectTasks.filter(t => t.status === 'pending').length
            const inProgress = projectTasks.filter(t => t.status === 'in_progress').length

            return (
              <div
                key={project.id}
                className="rounded-xl border border-gray-800 bg-gray-900 p-5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: project.color }}
                  />
                  <h2 className="font-semibold text-lg">{project.name}</h2>
                </div>
                <div className="flex gap-4 text-sm text-gray-400">
                  <span>⏳ {pending} pending</span>
                  <span>🔄 {inProgress} in progress</span>
                  <span>✅ {done} done</span>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </main>
  )
}