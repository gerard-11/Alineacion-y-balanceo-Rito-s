const variants = {
  indigo: 'bg-indigo-950 text-indigo-300 border-indigo-800',
  emerald: 'bg-emerald-950 text-emerald-300 border-emerald-800',
  amber: 'bg-amber-950 text-amber-300 border-amber-800',
  slate: 'bg-slate-800 text-slate-300 border-slate-700',
}

export default function Badge({ label, color = 'slate' }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${variants[color] ?? variants.slate}`}>
      {label}
    </span>
  )
}
