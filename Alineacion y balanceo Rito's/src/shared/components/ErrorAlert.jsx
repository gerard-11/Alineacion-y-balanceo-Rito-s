export default function ErrorAlert({ message }) {
  return (
    <div style={{ backgroundColor: '#2a1a1a', borderLeft: '5px solid #ff6b35' }} className="p-4 mb-6">
      <p className="text-red-400 font-mono">⚠ ERROR: {message}</p>
    </div>
  )
}
