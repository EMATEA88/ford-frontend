import { useEffect, useState } from 'react'
import { Copy, Check, ArrowLeft } from 'lucide-react'
import { api } from '../services/api'
import { useNavigate } from 'react-router-dom'

type Bank = {
id: number
name: string
bank: string
iban: string
}

export default function DepositBanks() {

const navigate = useNavigate()

const [banks, setBanks] = useState<Bank[]>([])
const [copied, setCopied] = useState<number | null>(null)

useEffect(() => {
api.get('/bank').then(res => setBanks(res.data))
}, [])

function copyIban(id: number, iban: string) {
navigator.clipboard.writeText(iban)
setCopied(id)
setTimeout(() => setCopied(null), 1500)
}

return (
<div className="min-h-screen bg-[#0B0E11] text-[#EAECEF] pb-28">

  {/* HEADER */}
  <div className="sticky top-0 z-50 bg-[#1E2329]/90 backdrop-blur border-b border-[#2B3139] px-5 py-4 flex items-center gap-3">

    <button
      onClick={() => navigate(-1)}
      className="p-2 rounded-lg bg-[#2B3139] hover:bg-[#3A424D]"
    >
      <ArrowLeft size={16} />
    </button>

    <h1 className="text-sm font-semibold">
      Contas para depósito
    </h1>

  </div>

  <div className="px-5 py-6 space-y-4 max-w-xl mx-auto">

    {banks.length === 0 && (
      <div className="
        bg-[#1E2329]
        border border-[#2B3139]
        rounded-2xl p-6 text-center
        text-[#848E9C]
      ">
        Nenhuma conta disponível
      </div>
    )}

    {banks.map(b => (
      <div
        key={b.id}
        className="
          bg-[#1E2329]
          border border-[#2B3139]
          rounded-2xl p-5
          hover:bg-[#2B3139]
          transition
        "
      >

        <div className="flex items-start justify-between gap-4">

          {/* INFO */}
          <div className="space-y-3 text-sm">

            <div>
              <p className="text-xs text-[#848E9C]">Titular</p>
              <p className="font-medium">{b.name}</p>
            </div>

            <div>
              <p className="text-xs text-[#848E9C]">Banco</p>
              <p className="font-medium">{b.bank}</p>
            </div>

            <div>
              <p className="text-xs text-[#848E9C]">IBAN</p>
              <p className="font-mono tracking-wide text-[#EAECEF]">
                {b.iban}
              </p>
            </div>

          </div>

          {/* COPY */}
          <button
            onClick={() => copyIban(b.id, b.iban)}
            className={`
              w-10 h-10 shrink-0 rounded-full
              flex items-center justify-center
              transition
              ${
                copied === b.id
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-[#0B0E11] border border-[#2B3139] text-[#848E9C]'
              }
            `}
          >
            {copied === b.id
              ? <Check size={16} />
              : <Copy size={16} />}
          </button>

        </div>

      </div>
    ))}

  </div>

</div>

)
}