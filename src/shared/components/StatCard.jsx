export default function StatCard({ title, value, subtitle }) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</p>
      <p className="text-4xl font-bold text-indigo-400 mt-3 font-mono">{value}</p>
      {subtitle && <p className="text-slate-500 text-sm mt-2">{subtitle}</p>}
    </div>
  )
}
