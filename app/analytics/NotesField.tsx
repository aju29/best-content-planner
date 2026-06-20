'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function NotesField({
  taskId,
  initialValue,
}: {
  taskId: string
  initialValue: string | null
}) {
  const [value, setValue] = useState(initialValue ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSave() {
    setSaving(true)
    setSaved(false)
    setError(null)

    const { error: err } = await supabase
      .from('tasks')
      .update({ analytics_notes: value.trim() || null })
      .eq('id', taskId)

    if (err) {
      setError('Failed to save.')
    } else {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
    setSaving(false)
  }

  return (
    <div className="flex flex-col gap-1.5 min-w-[220px]">
      <textarea
        rows={3}
        value={value}
        onChange={(e) => { setValue(e.target.value); setSaved(false) }}
        placeholder="Describe what you did in this video — footage type, pace, props, editing style..."
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white resize-none"
      />
      <div className="flex items-center gap-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-3 py-1 bg-gray-900 hover:bg-gray-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
        {saved && <span className="text-green-600 text-xs font-medium">Saved ✓</span>}
        {error && <span className="text-red-500 text-xs">{error}</span>}
      </div>
    </div>
  )
}
