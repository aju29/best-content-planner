import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTaskById, getProjects } from '@/lib/supabase'
import EditTaskForm from './EditTaskForm'

export default async function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [task, projects] = await Promise.all([getTaskById(id), getProjects()])

  if (!task) notFound()

  return (
    <main className="text-gray-900 p-8">
      <div className="max-w-2xl mx-auto">

        <div className="mb-8">
          <Link
            href={`/tasks/${id}`}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors mb-3 inline-block"
          >
            ← Back to Task
          </Link>
          <h1 className="text-3xl font-bold">Edit Task</h1>
          <p className="text-gray-500 mt-1 truncate">{task.title}</p>
        </div>

        <EditTaskForm task={task} projects={projects} />

      </div>
    </main>
  )
}
