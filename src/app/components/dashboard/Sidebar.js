import { useState } from "react"
import { Home, Trophy, Code, Users, Settings, LogOut, Menu, X, Target, BarChart3, Hammer } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Algorithmic", href: "/dashboard/algorithmic", icon: Code },
  { name: "Buildathon", href: "/dashboard/buildathon", icon: Hammer },
  { name: "Leaderboard", href: "/dashboard/leaderboard", icon: Trophy },
  { name: "Profile", href: "/dashboard/profile", icon: Users },
  { name: "Team", href: "/dashboard/team", icon: Target },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function Sidebar({ user, onLogout, activeItem = "/dashboard", onNavigation }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
    setIsMobileMenuOpen(false)
  }

  const handleNavClick = (href) => {
    if (onNavigation) {
      onNavigation(href)
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          className="p-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">O</span>
              </div>
              <div>
                <h2 className="font-semibold text-lg text-gray-900">OASIS</h2>
                <p className="text-sm text-gray-600">Platform</p>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-200">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="font-medium text-sm text-gray-900">{user?.name || "Loading..."}</p>
              <p className="text-xs text-gray-600">
                {user?.team ? `Team: ${user.team.name}` : "No team"}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = activeItem === item.href
              const Icon = item.icon
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </button>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <button
              className="w-full flex items-center justify-start px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden" 
          onClick={() => setIsMobileMenuOpen(false)} 
        />
      )}
    </>
  )
}