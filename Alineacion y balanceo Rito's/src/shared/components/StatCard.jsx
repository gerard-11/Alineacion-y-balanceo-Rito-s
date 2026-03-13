export default function StatCard({ title, value, subtitle, accentColor = '#ff6b35' }) {
  return (
    <div style={{ backgroundColor: '#2a2a2a', borderLeft: `5px solid ${accentColor}` }} className="shadow-2xl p-8">
      <h3 className="text-xs font-bold text-gray-400 tracking-widest">{title}</h3>
      <p className="text-5xl font-bold mt-4 text-white font-mono">{value}</p>
      <p className="text-gray-500 mt-4 text-xs tracking-wider">◆ {subtitle}</p>
    </div>
  )
}
