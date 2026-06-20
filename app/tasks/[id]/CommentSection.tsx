'use client'

import { useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { addCommentAction } from './actions'
import type { Comment } from '@/lib/types'

function PostButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors"
    >
      {pending ? 'Posting…' : 'Post Comment'}
    </button>
  )
}

export default function CommentSection({
  taskId,
  comments,
}: {
  taskId: string
  comments: Comment[]
}) {
  const formRef = useRef<HTMLFormElement>(null)

  async function handleAction(formData: FormData) {
    await addCommentAction(formData)
    formRef.current?.reset()
  }

  return (
    <div>
      <h2 className="font-bold text-gray-900 mb-4">
        Comments {comments.length > 0 && <span className="text-gray-400 font-normal">({comments.length})</span>}
      </h2>

      {/* Comment list */}
      {comments.length === 0 ? (
        <p className="text-gray-400 text-sm mb-6">No comments yet.</p>
      ) : (
        <div className="space-y-4 mb-6">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                {c.author_name[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-semibold text-sm text-gray-900">{c.author_name}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(c.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add comment form */}
      <form ref={formRef} action={handleAction} className="space-y-3">
        <input type="hidden" name="taskId" value={taskId} />
        <input
          name="author_name"
          type="text"
          placeholder="Your name"
          required
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white"
        />
        <textarea
          name="body"
          rows={3}
          placeholder="Write a comment…"
          required
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white resize-none"
        />
        <PostButton />
      </form>
    </div>
  )
}
