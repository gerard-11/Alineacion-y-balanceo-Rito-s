import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function ErrorAlert({ message }) {
  return (
    <div className="flex items-start gap-3 bg-red-950 border border-red-800 rounded-lg p-4 mb-6">
      <ExclamationTriangleIcon className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
      <p className="text-red-400 text-sm">{message}</p>
    </div>
  )
}
