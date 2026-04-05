import { NavLink } from "react-router-dom"
import {
  Home,
  User,
  ShoppingCart,
  CheckCircle,
  Package
} from "lucide-react"

const links = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/task", label: "Tarefas", icon: CheckCircle },
  { to: "/products", label: "Produtos", icon: Package },
  { to: "/store", label: "Loja", icon: ShoppingCart },
  { to: "/profile", label: "Perfil", icon: User },
]

export default function BottomNav() {
  return (
    <nav
      className="
        fixed bottom-0 left-0 right-0 z-40
        bg-[#0B0E11]/95 backdrop-blur
        border-t border-[#2B3139]
        h-[60px] flex items-center
      "
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex justify-around items-center w-full">

        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `
              flex flex-col items-center gap-1 text-[10px]
              transition-all duration-200
              ${isActive ? "text-cyan-400" : "text-[#848E9C]"}
              `
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`
                    flex items-center justify-center
                    w-8 h-8 rounded-lg transition
                    ${isActive ? "bg-cyan-500/10" : "bg-transparent"}
                  `}
                >
                  <Icon size={18} />
                </div>

                <span className="tracking-wide">
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}

      </div>
    </nav>
  )
}