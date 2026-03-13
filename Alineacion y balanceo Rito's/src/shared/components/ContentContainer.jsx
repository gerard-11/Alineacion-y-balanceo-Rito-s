export default function ContentContainer({ children }) {
  return (
    <div style={{ backgroundColor: '#2a2a2a', borderTop: '3px solid #ff6b35' }} className="shadow-2xl p-8">
      {children}
    </div>
  )
}
