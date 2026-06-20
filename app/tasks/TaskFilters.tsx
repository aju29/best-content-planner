'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import type { Project } from '@/lib/types'

const STATUSES = [
  { value: '', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'review', label: 'Review' },
  { value: 'done', label: 'Done' },
]

export default function TaskFilters({ projects }: { projects: Project[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeProject = searchParams.get('project') ?? ''
  const activeStatus = searchParams.get('status') ?? ''

  function setFilter(key: 'project' | 'status', value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/tasks?${params.toString()}`)
  }

  return (
    <div className="space-y-3">
      {/* Project filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('project', '')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            activeProject === ''
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All Projects
        </button>
        {projects.map((p) => (
          <button
            key={p.id}
            onClick={() => setFilter('project', p.id)}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              activeProject === p.id
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: p.color }}
            />
            {p.name}
          </button>
        ))}
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button
            key={s.value}
            onClick={() => setFilter('status', s.value)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              activeStatus === s.value
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}
