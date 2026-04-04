import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import BottomNav from "../components/BottomNav"
import { ArrowLeft, MessageCircle } from "lucide-react"
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
    className={`flex-1 overflow-y-auto ${
      isChatPage ? "pt-14" : "pb-20"
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
}

function openManager() {
window.open(
"https://wa.me/447469665361",
"_blank"
)
}

return (
<div className="relative">

  {/* MENU */}
  {open && (
    <div className="
      absolute bottom-14 right-0
      bg-[#1E2329]
      border border-[#2B3139]
      rounded-2xl p-2
      space-y-2
      shadow-xl
    ">

      <button
        onClick={openGroup}
        className="
          w-full px-4 py-2 text-sm text-left
          hover:bg-[#2B3139]
          rounded-lg
        "
      >
        Grupo WhatsApp
      </button>

      <button
        onClick={openManager}
        className="
          w-full px-4 py-2 text-sm text-left
          hover:bg-[#2B3139]
          rounded-lg
        "
      >
        Falar com gerente
      </button>

    </div>
  )}

  {/* BOTÃO */}
  <button
    onClick={() => setOpen(!open)}
    className="
      w-11 h-11 rounded-full
      bg-[#1E2329]
      border border-[#2B3139]
      text-[#848E9C]
      flex items-center justify-center
      hover:bg-[#2B3139]
      transition
    "
  >
    <MessageCircle size={18} />
  </button>

</div>

)
}