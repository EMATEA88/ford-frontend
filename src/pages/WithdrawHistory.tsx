import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { ArrowLeft, Clock, CheckCircle, XCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Withdrawal {
id: number
amount: number
fee: number
status: string
createdAt: string
}

export default function WithdrawHistory() {

const navigate = useNavigate()

const [items, setItems] = useState<Withdrawal[]>([])
const [loading, setLoading] = useState(true)

useEffect(() => {
api.get('/withdrawals')
.then(res => setItems(res.data))
.finally(() => setLoading(false))
}, [])

function getStatusMeta(status: string) {
switch (status) {
case 'SUCCESS':
return {
label: 'Concluído',
color: 'text-emerald-400',
bg: 'bg-emerald-500/10',
icon: CheckCircle
}
case 'PENDING':
return {
label: 'Em processamento',
color: 'text-yellow-400',
bg: 'bg-yellow-500/10',
icon: Clock
}
case 'REJECTED':
return {
label: 'Rejeitado',
color: 'text-red-400',
bg: 'bg-red-500/10',
icon: XCircle
}
default:
return {
label: status,
color: 'text-[#EAECEF]',
bg: 'bg-[#2B3139]',
icon: Clock
}
}
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
      Histórico de retiradas
    </h1>

  </div>

  <div className="px-5 py-6 space-y-4 max-w-xl mx-auto">

    {loading && (
      <p className="text-sm text-[#848E9C]">
        Carregando histórico…
      </p>
    )}

    {!loading && items.length === 0 && (
      <div className="
        bg-[#1E2329]
        border border-[#2B3139]
        rounded-2xl p-6 text-center
        text-[#848E9C]
      ">
        Nenhuma retirada encontrada
      </div>
    )}

    {items.map(w => {

      const meta = getStatusMeta(w.status)
      const Icon = meta.icon

      return (
        <div
          key={w.id}
          className="
            bg-[#1E2329]
            border border-[#2B3139]
            rounded-2xl p-5
            hover:bg-[#2B3139] transition
          "
        >

          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">

            <div className="flex items-center gap-3">

              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${meta.bg}
              `}>
                <Icon size={18} className={meta.color} />
              </div>

              <div>
                <p className="text-sm font-medium">
                  Retirada
                </p>
                <p className="text-xs text-[#848E9C]">
                  {new Date(w.createdAt).toLocaleDateString()}
                </p>
              </div>

            </div>

            <span className={`
              text-xs px-3 py-1 rounded-full font-medium
              ${meta.bg} ${meta.color}
            `}>
              {meta.label}
            </span>

          </div>

          {/* VALORES */}
          <div className="grid grid-cols-2 gap-3 text-sm">

            <div className="bg-[#0B0E11] p-3 rounded-xl">
              <p className="text-[#848E9C] text-xs">Valor</p>
              <p className="font-semibold">
                {Number(w.amount).toLocaleString()} Kz
              </p>
            </div>

            <div className="bg-[#0B0E11] p-3 rounded-xl">
              <p className="text-[#848E9C] text-xs">Taxa</p>
              <p className="font-semibold text-red-400">
                {Number(w.fee).toLocaleString()} Kz
              </p>
            </div>

          </div>

          {/* DATA COMPLETA */}
          <div className="text-xs text-[#6B7280] mt-4">
            {new Date(w.createdAt).toLocaleString()}
          </div>

        </div>
      )
    })}

  </div>

</div>

)
}