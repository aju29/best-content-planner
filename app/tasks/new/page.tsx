import Link from 'next/link'
import { getProjects } from '@/lib/supabase'
import NewTaskForm from './NewTaskForm'

export default async function NewTaskPage() {
  const projects = await getProjects()

  return (
    <main className="text-gray-900 p-8">
      <div className="max-w-2xl mx-auto">

        <div className="mb-8">
          <Link
            href="/tasks"
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors mb-3 inline-block"
          >
            ← Back to Tasks
          </Link>
          <h1 className="text-3xl font-bold">New Task</h1>
          <p className="text-gray-500 mt-1">Brief your team on what needs to be created.</p>
        </div>

        <NewTaskForm projects={projects} />

      </div>
    </main>
  )
}
