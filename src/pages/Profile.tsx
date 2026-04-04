import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserService } from '../services/user.service'
import { formatCurrencyAOA } from "../utils/formatCurrency"

import {
  Wallet,
  ArrowDown,
  Bank,
  ArrowsLeftRight,
  Gift,
  ShieldCheck,
  Copy,
  SignOut,
  CaretRight
} from '@phosphor-icons/react'

import { Check } from 'lucide-react'

type UserProfile = {
  fullName?: string
  phone: string
  email: string
  publicId: string
  referralCode?: string
  balance: number
}

export default function Profile() {

  const navigate = useNavigate()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [copiedId, setCopiedId] = useState(false)
  const [copiedRef, setCopiedRef] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const userRes = await UserService.me()
        setUser(userRes.data)
      } catch {}
    }
    load()
  }, [])

  if (!user) return null

  const shortId = user.publicId?.slice(0, 8)

  async function copyText(value: string, type: 'id' | 'ref') {
    await navigator.clipboard.writeText(value)

    if (type === 'id') {
      setCopiedId(true)
      setTimeout(() => setCopiedId(false), 2000)
    } else {
      setCopiedRef(true)
      setTimeout(() => setCopiedRef(false), 2000)
    }
  }

  function handleLogout() {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[#0B0E11] text-[#EAECEF] flex flex-col">

      <div className="flex-1 px-5 pt-4 flex flex-col gap-5">

        {/* ================= PROFILE ================= */}
        <div className="
          rounded-3xl
          p-5
          bg-gradient-to-br from-[#1E2329] to-[#14181D]
          border border-[#2B3139]
        ">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-full overflow-hidden border border-[#2B3139]">
              <img src="/logo.png" className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 min-w-0">

              <p className="text-base font-semibold truncate">
                {user.fullName || user.phone}
              </p>

              <p className="text-[11px] text-[#848E9C] truncate">
                {user.email}
              </p>

              {/* ID */}
              <div className="flex items-center gap-2 text-[11px] text-[#848E9C]">
                <span>ID: {shortId}</span>
                <button onClick={() => copyText(user.publicId, 'id')}>
                  {copiedId ? <Check size={12} /> : <Copy size={12} />}
                </button>
              </div>

              {/* REFERRAL */}
              <div className="flex items-center gap-2 text-[11px] text-[#4DA3FF] mt-1">
                <span>Convite: {user.referralCode}</span>
                <button onClick={() => copyText(user.referralCode || '', 'ref')}>
                  {copiedRef ? <Check size={12} /> : <Copy size={12} />}
                </button>
              </div>

            </div>

          </div>

          {/* ================= SALDO ================= */}
          <div className="mt-5 border-t border-[#2B3139] pt-4">

            <p className="text-[11px] text-[#848E9C] uppercase">
              Saldo disponível
            </p>

            <p className="text-2xl font-semibold mt-1">
              {formatCurrencyAOA(user.balance)}
            </p>

            {/* BOTÕES */}
            <div className="flex gap-3 mt-4">

              <button
                onClick={() => navigate('/deposit')}
                className="
                  flex-1 h-11
                  rounded-xl
                  bg-gradient-to-r from-blue-500 to-blue-600
                  text-white font-semibold
                  flex items-center justify-center gap-2
                "
              >
                <Wallet size={16} weight="fill" />
                Recarregar
              </button>

              <button
                onClick={() => navigate('/withdraw')}
                className="
                  flex-1 h-11
                  rounded-xl
                  bg-[#1E2329]
                  border border-[#2B3139]
                  flex items-center justify-center gap-2
                "
              >
                <ArrowDown size={16} weight="fill" />
                Retirar
              </button>

            </div>

          </div>

        </div>

        {/* ================= PATRIMÓNIO ================= */}
        <div className="
          rounded-3xl
          p-5
          bg-gradient-to-br from-[#1E2329] to-[#14181D]
          border border-[#2B3139]
          flex flex-col items-center
        ">

          <p className="text-sm text-[#848E9C] mb-4">
            Património total
          </p>

          <div className="
            w-32 h-32 rounded-full
            border-[6px] border-blue-500
            flex items-center justify-center
          ">
            <div className="text-center">
              <p className="text-sm text-[#848E9C]">Total</p>
              <p className="text-sm font-semibold">
                {formatCurrencyAOA(user.balance)}
              </p>
            </div>
          </div>

        </div>

        {/* ================= SESSÕES ================= */}
        <div className="grid grid-cols-2 gap-4">

          <SessionItem label="Banco" icon={<Bank size={18} weight="fill" />} onClick={() => navigate('/bank')} />
          <SessionItem label="Transações" icon={<ArrowsLeftRight size={18} weight="fill" />} onClick={() => navigate('/transactions')} />
          <SessionItem label="Presente" icon={<Gift size={18} weight="fill" />} onClick={() => navigate('/gift')} />
          <SessionItem label="Segurança" icon={<ShieldCheck size={18} weight="fill" />} onClick={() => navigate('/security')} />

        </div>

        {/* LOGOUT (AGORA VISÍVEL) */}
        <div className="mt-4 mb-6 flex justify-center">
          <button
            onClick={handleLogout}
            className="
              flex items-center gap-2
              text-sm text-red-400
              bg-[#1E2329]
              px-4 py-2
              rounded-xl
              border border-[#2B3139]
            "
          >
            <SignOut size={16} weight="bold" />
            Terminar sessão
          </button>
        </div>

      </div>
    </div>
  )
}

/* COMPONENTE */

function SessionItem({ label, icon, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="
        flex items-center gap-3
        p-4
        rounded-2xl
        bg-gradient-to-br from-[#1E2329] to-[#14181D]
        border border-[#2B3139]
      "
    >
      <div className="w-10 h-10 rounded-xl bg-[#0F172A] flex items-center justify-center text-blue-400">
        {icon}
      </div>

      <div className="flex-1 text-left">
        <p className="text-sm font-medium">{label}</p>
      </div>

      <CaretRight size={16} className="text-[#848E9C]" />
    </button>
  )
}