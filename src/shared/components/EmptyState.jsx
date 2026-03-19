import { InboxIcon } from '@heroicons/react/24/outline'

export default function EmptyState({ message = 'Sin resultados' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-slate-500">
      <InboxIcon className="w-10 h-10 mb-3 text-slate-700" />
      <p className="text-sm">{message}</p>
    </div>
  )
}
