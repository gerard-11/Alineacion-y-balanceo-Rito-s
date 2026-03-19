import { Link, useLocation } from 'react-router-dom'
import {
  ArchiveBoxIcon,
  WrenchScrewdriverIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  ShoppingCartIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'

const navLinks = [
  { to: '/ventas',      label: 'Ventas',      Icon: ShoppingCartIcon },
  { to: '/productos',   label: 'Productos',   Icon: ArchiveBoxIcon },
  { to: '/servicios',   label: 'Servicios',   Icon: WrenchScrewdriverIcon },
  { to: '/inventario',  label: 'Inventario',  Icon: ClipboardDocumentListIcon },
  { to: '/historial',   label: 'Historial',   Icon: ClockIcon },
  { to: '/clientes',    label: 'Clientes',    Icon: UsersIcon },
]

export default function MainLayout({ children }) {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-indigo-500 text-xl">◆</span>
            <div>
              <p className="text-white font-bold text-sm leading-tight">RITO'S</p>
              <p className="text-slate-500 text-xs leading-tight">Alineación y Balanceo</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navLinks.map(({ to, label, Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors no-underline ${
                isActive(to)
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 bg-slate-950 min-h-screen overflow-auto">
        {children}
      </div>
    </div>
  )
}
