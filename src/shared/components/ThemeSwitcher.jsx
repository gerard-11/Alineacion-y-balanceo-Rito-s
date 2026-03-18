import { useTheme } from '@contexts/ThemeContext'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-lg transition-colors cursor-pointer"
      style={{
        backgroundColor: theme === 'dark' ? '#1e293b' : '#e2e8f0',
        color: theme === 'dark' ? '#94a3b8' : '#64748b',
      }}
      title={`Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}
    >
      {theme === 'dark' ? (
        <SunIcon className="w-5 h-5" />
      ) : (
        <MoonIcon className="w-5 h-5" />
      )}
    </button>
  )
}
