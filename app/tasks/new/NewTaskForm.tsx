'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import { createTaskAction, type FormState } from './actions'
import type { Project } from '@/lib/types'

const CHANNELS = ['YouTube', 'Instagram', 'Facebook', 'TikTok']
const CONTENT_TYPES = ['Longform', 'Short', 'Reel', 'Post', 'Story']
const ASSIGNEES = ['Arjun', 'Pragya', 'Asmita', 'Suraj', 'Guest']

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold rounded-lg transition-colors"
    >
      {pending ? 'Creating…' : 'Create Task'}
    </button>
  )
}

function Field({
  label,
  children,
  required,
}: {
  label: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-indigo-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputClass =
  'w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition bg-white'

const selectClass =
  'w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition bg-white'

export default function NewTaskForm({ projects }: { projects: Project[] }) {
  const [state, action] = useActionState<FormState, FormData>(
    createTaskAction,
    null
  )

  return (
    <form action={action} className="space-y-8">
      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm font-medium">
          {state.error}
        </div>
      )}

      {/* Core */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">
        <h2 className="font-bold text-gray-900">Task Details</h2>

        <Field label="Title" required>
          <input
            name="title"
            type="text"
            placeholder="What needs to be created?"
            className={inputClass}
            autoFocus
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Project" required>
            <select name="project_id" className={selectClass} defaultValue="">
              <option value="" disabled>Select project…</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </Field>

          <Field label="Channel">
            <select name="channel" className={selectClass} defaultValue="">
              <option value="">—</option>
              {CHANNELS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>

          <Field label="Content Type">
            <select name="content_type" className={selectClass} defaultValue="">
              <option value="">—</option>
              {CONTENT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Assigned To">
            <select name="assigned_to" className={selectClass} defaultValue="">
              <option value="">—</option>
              {ASSIGNEES.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </Field>

          <Field label="Due Date">
            <input
              name="due_date"
              type="date"
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">
        <h2 className="font-bold text-gray-900">Content</h2>

        <Field label="Brief">
          <textarea
            name="brief"
            rows={3}
            placeholder="What is this piece about? Goal, angle, key message…"
            className={`${inputClass} resize-none`}
          />
        </Field>

        <Field label="Script">
          <textarea
            name="script"
            rows={5}
            placeholder="Full script or talking points…"
            className={`${inputClass} resize-none`}
          />
        </Field>

        <Field label="Instructions">
          <textarea
            name="instructions"
            rows={3}
            placeholder="Editing notes, thumbnail direction, posting instructions…"
            className={`${inputClass} resize-none`}
          />
        </Field>

        <Field label="Reference Links">
          <textarea
            name="reference_links"
            rows={2}
            placeholder="Paste reference URLs, one per line…"
            className={`${inputClass} resize-none`}
          />
        </Field>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <SubmitButton />
        <Link
          href="/tasks"
          className="text-gray-500 hover:text-gray-900 font-medium transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  )
}
