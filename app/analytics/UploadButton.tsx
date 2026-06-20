'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function UploadButton({ taskId }: { taskId: string }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError(null)

    try {
      const ext = file.name.split('.').pop()
      const path = `${taskId}-${Date.now()}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('analytics-screenshots')
        .upload(path, file, { upsert: true })

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage
        .from('analytics-screenshots')
        .getPublicUrl(path)

      const { error: updateError } = await supabase
        .from('tasks')
        .update({ analytics_screenshot: urlData.publicUrl })
        .eq('id', taskId)

      if (updateError) throw updateError

      router.refresh()
    } catch {
      setError('Upload failed. Try again.')
      setUploading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
      <button
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors"
      >
        {uploading ? 'Uploading…' : '↑ Upload'}
      </button>
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  )
}
