import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserService } from '../services/user.service'
import { ProductService } from '../services/product.service'
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Users,
  Gift,
  FileText,
  Info,
  Package,
  Eye,
  EyeOff,
  X,
  MessageCircle,
  Megaphone
} from 'lucide-react'

export default function Home() {

  const navigate = useNavigate()

  const [user, setUser] = useState<any>({})
  const [highlight, setHighlight] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)

  // 👁️ CONTROLE DE VISIBILIDADE
  const [hideBalance, setHideBalance] = useState(
    localStorage.getItem('hideBalance') === 'true'
  )

  useEffect(() => {
    load()
    checkModal()
  }, [])

  async function load() {
    const [u, p] = await Promise.all([
      UserService.me(),
      ProductService.list()
    ])

    setUser(u.data)

    const sorted = p.data.data.sort((a: any, b: any) => a.price - b.price)
    setHighlight(sorted[0])
  }

  // LÓGICA DO MODAL
  function checkModal() {
    const hasSeen = sessionStorage.getItem('hasSeenWelcomeModal')
    if (!hasSeen) {
      setTimeout(() => {
        setShowModal(true)
      }, 1500) // Aparece após 1.5 segundos
    }
  }

  function closeModal() {
    setShowModal(false)
    sessionStorage.setItem('hasSeenWelcomeModal', 'true')
  }

  function handleJoinGroup() {
    window.open("https://chat.whatsapp.com/Cf8sqTXqKVL1uAoH8J6D9i?mode=gi_t", "_blank")
    closeModal()
  }

  function toggleBalance() {
    const value = !hideBalance
    setHideBalance(value)
    localStorage.setItem('hideBalance', String(value))
  }

  return (
    <div className="min-h-screen bg-[#0B0E11] text-[#EAECEF] px-5 pt-6 pb-28 space-y-6 relative">

      {/* MODAL DE BOAS-VINDAS */}
      {showModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#1E2329] border border-[#2B3139] w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl scale-in-center">
            
            {/* Header Azul */}
            <div className="bg-[#2F66EE] p-6 flex justify-center relative">
              <button 
                onClick={closeModal}
                className="absolute top-3 right-3 text-white/70 hover:text-white transition"
              >
                <X size={20} />
              </button>
              <div className="bg-white/20 p-4 rounded-full">
                <Megaphone size={40} className="text-white" />
              </div>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                Comunidade Oficial
              </h3>
              <p className="text-[#848E9C] text-sm mb-6">
                Junte-se ao nosso grupo oficial para receber sinais diários, bônus exclusivos e suporte 24h.
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleJoinGroup}
                  className="w-full py-3 bg-[#2F66EE] hover:bg-[#1a54db] text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <MessageCircle size={20} />
                  Aceder ao WhatsApp
                </button>
                
                <button
                  onClick={closeModal}
                  className="w-full py-2 text-[#848E9C] text-sm hover:text-white transition"
                >
                  Agora não
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-[#848E9C]">Bem-vindo</p>
          <h1 className="text-lg font-semibold">
            {user.phone || '---'}
          </h1>
        </div>

        {/* 👁️ BOTÃO */}
        <button
          onClick={toggleBalance}
          className="text-[#848E9C] hover:text-white transition"
        >
          {hideBalance ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* SALDO */}
      <div className="bg-[#1E2329] border border-[#2B3139] rounded-3xl p-6 text-center">
        <p className="text-sm text-[#848E9C]">Saldo disponível</p>

        <p className="text-3xl font-bold text-emerald-400 mt-2">
          {hideBalance
            ? '••••••'
            : `${Number(user.balance || 0).toLocaleString()} Kz`}
        </p>
      </div>

      {/* AÇÕES PRINCIPAIS */}
      <div className="grid grid-cols-4 gap-3 text-center">

        <Action icon={<Wallet size={18} />} label="Depositar" onClick={() => navigate('/deposit')} />
        <Action icon={<ArrowDownLeft size={18} />} label="Retirar" onClick={() => navigate('/withdraw')} />
        <Action icon={<Package size={18} />} label="Produtos" onClick={() => navigate('/products')} />
        <Action icon={<Users size={18} />} label="Equipa" onClick={() => navigate('/referral')} />

      </div>

      {/* AÇÕES SECUNDÁRIAS */}
      <div className="grid grid-cols-4 gap-3 text-center">

        <Action icon={<ArrowUpRight size={18} />} label="Aplicações" onClick={() => navigate('/applications')} />
        <Action icon={<Gift size={18} />} label="Presente" onClick={() => navigate('/gift')} />
        <Action icon={<FileText size={18} />} label="Transações" onClick={() => navigate('/transactions')} />
        <Action icon={<Info size={18} />} label="Sobre" onClick={() => navigate('/about')} />

      </div>

      {/* PRODUTO DESTACADO */}
      {highlight && (
        <div className="bg-[#1E2329] border border-[#2B3139] rounded-3xl p-5 space-y-4">

          <p className="text-sm text-[#848E9C] font-medium">
            Recomendado
          </p>

          <img
            src={getImage(highlight.name)}
            className="w-full h-45 object-contain bg-[#0B0E11] rounded-xl"
          />

          <p className="font-semibold text-sm">
            {highlight.name}
          </p>

          <div className="grid grid-cols-2 gap-3 text-sm">

            <Card
              label="Investimento"
              value={hideBalance ? '••••' : `${highlight.price} Kz`}
            />

            <Card
              label="Rendimento diário"
              value={hideBalance
                ? '••••'
                : `${Math.floor(highlight.price * (highlight.dailyRate / 100))} Kz`}
            />

          </div>

          <button
            onClick={() => navigate('/products')}
            className="
              w-full h-11 rounded-xl
              bg-[#2B3139]
              text-[#EAECEF]
              border border-[#3A424D]
              hover:bg-[#3A424D]
              transition
            "
          >
            Ver produto
          </button>

        </div>
      )}

    </div>
  )
}

/* ================= COMPONENTES ================= */

function Action({ icon, label, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="
        bg-[#1E2329]
        border border-[#2B3139]
        rounded-xl p-3
        flex flex-col items-center gap-1
        text-xs
        hover:bg-[#2B3139]
        transition
      "
    >
      {icon}
      {label}
    </button>
  )
}

function Card({ label, value }: any) {
  return (
    <div className="bg-[#0B0E11] p-3 rounded-xl">
      <p className="text-xs text-[#848E9C]">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  )
}

/* ================= IMAGENS ================= */

function getImage(name: string) {
  const map: Record<string, string> = {
    "Ford Mustang GT": "/produtos/Ford-Mustang-GT.jpg",
    "Ford F-150": "/produtos/Ford-150.jpg",
    "Ford Explorer": "/produtos/Ford-Explorer.jpg",
    "Ford GT": "/produtos/Ford-DT.jpg",
    "Ford Fiesta": "/produtos/Ford-Fiesta.jpg",
  }

  return map[name] || "/produtos/default.jpg"
}