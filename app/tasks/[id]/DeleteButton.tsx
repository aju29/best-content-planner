'use client'

import { useState, useTransition } from 'react'
import { deleteTaskAction } from './actions'

export default function DeleteButton({ taskId }: { taskId: string }) {
  const [confirming, setConfirming] = useState(false)
  const [input, setInput] = useState('')
  const [isPending, startTransition] = useTransition()

  const isMatch = input.trim().toLowerCase() === 'heisenberg'

  function handleDelete() {
    if (!isMatch) return
    startTransition(() => deleteTaskAction(taskId))
  }

  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="px-3 py-1.5 text-sm font-medium text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
      >
        Delete
      </button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-500 font-medium">Say my name…</span>
        <input
          autoFocus
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Escape' && setConfirming(false)}
          placeholder="h...berg"
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-36 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent bg-white"
        />
      </div>
      <div className="flex items-center gap-1 self-end">
        <button
          onClick={handleDelete}
          disabled={!isMatch || isPending}
          className="px-3 py-1.5 text-sm font-semibold bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
        >
          {isPending ? 'Deleting…' : 'Confirm'}
        </button>
        <button
          onClick={() => { setConfirming(false); setInput('') }}
          className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
