import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import BottomNav from "../components/BottomNav"
import { ArrowLeft, MessageCircle, Users, Headset } from "lucide-react"
import { connectSocket } from "../services/socket"

export default function AppLayout() {

  const navigate = useNavigate()
  const location = useLocation()

  const pathname = location.pathname || ""

  /* ================= SOCKET ================= */

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return
    connectSocket(token)
  }, [])

  /* ================= ROUTE CONFIG ================= */

  const isChatPage = pathname.startsWith("/otc/chat")

  /* ================= UI ================= */

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0B0E11] text-[#EAECEF] flex flex-col">

      {/* ================= TOP BACK BUTTON (CHAT ONLY) ================= */}
      {isChatPage && (
        <div className="fixed top-0 left-0 right-0 h-14 bg-[#0B0E11] flex items-center px-4 z-[9999] border-b border-[#2B3139]">
          <button
            onClick={() => navigate(-1)}
            className="text-white"
          >
            <ArrowLeft size={22} />
          </button>
        </div>
      )}

      {/* ================= MAIN ================= */}
      <main
        className={`flex-1 overflow-y-auto ${isChatPage ? "pt-14" : "pb-20"
          }`}
      >
        <Outlet />
      </main>

      {/* ================= FOOTER ================= */}
      {!isChatPage && <BottomNav />}

      {/* ================= SUPPORT BUTTON ================= */}
      {!isChatPage && (
        <div className="fixed bottom-24 right-5 z-[9999]">
          <SupportButton />
        </div>
      )}

    </div>

  )
}

/* ================= SUPPORT BUTTON ================= */

function SupportButton() {

  const [open, setOpen] = useState(false)

  function openGroup() {
    window.open(
      "https://chat.whatsapp.com/Cf8sqTXqKVL1uAoH8J6D9i?mode=gi_t",
      "_blank"
    )
    setOpen(false)
  }

  function openManager() {
    window.open(
      "https://wa.me/447469665361",
      "_blank"
    )
    setOpen(false)
  }

  return (
    <div className="relative">

      {/* MENU FLUTUANTE */}
      {open && (
        <div className="
          absolute bottom-16 right-0
          bg-[#1E2329]
          border border-[#2B3139]
          rounded-2xl p-2
          space-y-1
          shadow-2xl
          w-52
          animate-in slide-in-from-bottom-5 duration-200
        ">
          <p className="text-[10px] text-[#848E9C] px-3 py-1 font-bold uppercase tracking-wider">Suporte Oficial</p>
          
          <button
            onClick={openGroup}
            className="
              w-full px-4 py-3 text-sm text-left
              hover:bg-[#2B3139]
              rounded-xl
              text-white flex items-center gap-3 transition
            "
          >
            <div className="bg-[#25D366]/10 p-2 rounded-lg">
                <Users size={18} className="text-[#25D366]" />
            </div>
            Grupo WhatsApp
          </button>

          <button
            onClick={openManager}
            className="
              w-full px-4 py-3 text-sm text-left
              hover:bg-[#2B3139]
              rounded-xl
              text-white flex items-center gap-3 transition
            "
          >
            <div className="bg-[#25D366]/10 p-2 rounded-lg">
                <Headset size={18} className="text-[#25D366]" />
            </div>
            Falar com gerente
          </button>
        </div>
      )}

      {/* BOTÃO WHATSAPP ESTILIZADO */}
      <div className="relative">
        {/* Efeito de Ondas (Pulse) ao redor do botão */}
        {!open && (
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
        )}
        
        <button
            onClick={() => setOpen(!open)}
            className={`
            relative w-14 h-14 rounded-full
            ${open ? 'bg-[#1E2329] border border-[#2B3139]' : 'bg-[#25D366] shadow-[0_8px_16px_rgba(37,211,102,0.3)]'}
            text-white
            flex items-center justify-center
            hover:scale-110
            active:scale-90
            transition-all duration-300
            z-10
            `}
        >
            <MessageCircle size={28} fill={open ? "none" : "currentColor"} className={open ? "text-[#848E9C]" : "text-white"} />
            
            {/* Ponto de Notificação Vermelho */}
            {!open && (
                <span className="absolute top-0 right-0 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-[#0B0E11]"></span>
                </span>
            )}
        </button>
      </div>

    </div>

  )
}