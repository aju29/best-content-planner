'use client'

import { useTransition } from 'react'
import { updateStatusAction } from './actions'
import type { TaskStatus } from '@/lib/types'

const STEPS: { value: TaskStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'review', label: 'Review' },
  { value: 'done', label: 'Done' },
]

const ACTIVE: Record<TaskStatus, string> = {
  pending: 'bg-gray-200 text-gray-800 font-semibold',
  in_progress: 'bg-blue-600 text-white font-semibold',
  review: 'bg-amber-500 text-white font-semibold',
  done: 'bg-green-600 text-white font-semibold',
}

export default function StatusUpdater({
  taskId,
  current,
}: {
  taskId: string
  current: TaskStatus
}) {
  const [isPending, startTransition] = useTransition()

  function handleClick(status: TaskStatus) {
    if (status === current) return
    startTransition(() => updateStatusAction(taskId, status))
  }

  return (
    <div className="flex flex-wrap gap-2">
      {STEPS.map((step) => (
        <button
          key={step.value}
          onClick={() => handleClick(step.value)}
          disabled={isPending}
          className={`px-4 py-2 rounded-lg text-sm transition-all disabled:opacity-60 ${
            current === step.value
              ? ACTIVE[step.value]
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          {step.label}
        </button>
      ))}
    </div>
  )
}
