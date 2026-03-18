import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  ArchiveBoxIcon,
  WrenchScrewdriverIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  ShoppingCartIcon,
  ClockIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { useAuth } from '@contexts/AuthContext'
import { useTheme } from '@contexts/ThemeContext'
import { ThemeSwitcher } from '@shared/components'

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
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { bg, text, border } = useTheme()
  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className={`flex min-h-screen ${bg.primary}`}>
      {/* Sidebar */}
      <aside className={`w-64 shrink-0 ${bg.secondary} border-r ${border} flex flex-col`}>
        {/* Logo */}
        <div className={`px-6 py-6 border-b ${border} space-y-3`}>
          <div className="flex items-center justify-between gap-2">

            <button
              onClick={handleLogout}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${text.tertiary} hover:${text.secondary} hover:${bg.tertiary} transition-colors cursor-pointer`}
              title="Cerrar sesión"
            > Cerrar sesion
              <ArrowRightOnRectangleIcon className="w-4 h-4 shrink-0 " />
            </button>
            <ThemeSwitcher />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-indigo-500 text-xl">◆</span>
            <div>
              <p className={`${text.primary} font-bold text-sm leading-tight`}>RITO'S</p>
              <p className={`${text.tertiary} text-xs leading-tight`}>Alineación y Balanceo</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className={`flex-1 px-3 py-4 space-y-1`}>
          {navLinks.map(({ to, label, Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors no-underline ${
                isActive(to)
                  ? 'bg-indigo-600 text-white'
                  : `${text.tertiary} hover:${text.secondary} hover:${bg.tertiary}`
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        {/* User Info */}
        {user && (
          <div className={`px-6 py-4 border-t ${border}`}>
            <p className={`text-xs ${text.tertiary}`}>Usuario</p>
            <p className={`text-sm font-medium ${text.primary} truncate`}>{user.email}</p>
          </div>
        )}
      </aside>

      {/* Main content */}
      <div className={`flex-1 ${bg.primary} min-h-screen overflow-auto`}>
        {children}
      </div>
    </div>
  )
}
