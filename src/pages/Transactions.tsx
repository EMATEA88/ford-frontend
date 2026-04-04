import { useEffect, useState, useMemo } from 'react'
import { TransactionService } from '../services/transaction.service'
import type { TransactionType } from '../types/transaction.types'
import {
ArrowDownCircle,
ArrowUpCircle,
Wallet,
Gift,
Coins,
} from 'lucide-react'

type Transaction = {
id: number
type: TransactionType
amount: number
createdAt: string
}

const CACHE_KEY = 'transactions-cache'

const TYPE_META: Record<
  TransactionType,
  {
    label: string
    icon: any
    color: string
    bg: string
    sign: '+' | '-'
  }
> = {
  RECHARGE: {
    label: 'Recarga',
    icon: Wallet,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    sign: '+'
  },
  WITHDRAW: {
    label: 'Levantamento',
    icon: ArrowDownCircle,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    sign: '-'
  },
  BUY_DEBIT: {
    label: 'Compra OTC',
    icon: ArrowDownCircle,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    sign: '-'
  },
  SELL_CREDIT: {
    label: 'Venda OTC',
    icon: ArrowUpCircle,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    sign: '+'
  },
  SERVICE_DEBIT: {
    label: 'Pagamento Serviço',
    icon: ArrowDownCircle,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    sign: '-'
  },
  REFUND: {
    label: 'Reembolso',
    icon: ArrowUpCircle,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    sign: '+'
  },
  COMMISSION: {
    label: 'Comissão',
    icon: Coins,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    sign: '+'
  },
  GIFT: {
    label: 'Presente',
    icon: Gift,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    sign: '+'
  },
  INVESTMENT_DEBIT: {
    label: 'Investimento',
    icon: ArrowDownCircle,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    sign: '-'
  },
  INVESTMENT_CREDIT: {
    label: 'Lucro Investimento',
    icon: ArrowUpCircle,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    sign: '+'
  },
  INVESTMENT_CANCEL_REFUND: {
    label: 'Cancelamento Invest.',
    icon: ArrowUpCircle,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    sign: '+'
  }
}
export default function Transactions() {

const cached = localStorage.getItem(CACHE_KEY)
const initial = cached ? JSON.parse(cached) : []

const [items, setItems] = useState<Transaction[]>(initial)

useEffect(() => {
let mounted = true

TransactionService.list()
  .then(data => {
    if (!mounted || !Array.isArray(data)) return
    setItems(data)
    localStorage.setItem(CACHE_KEY, JSON.stringify(data))
  })
  .catch(() => {})

return () => { mounted = false }

}, [])

const grouped = useMemo(() => {
return items.reduce((acc: any, tx) => {
const date = new Date(tx.createdAt)
const key = date.toLocaleDateString('pt-AO', {
day: '2-digit',
month: 'long',
year: 'numeric',
})
if (!acc[key]) acc[key] = []
acc[key].push(tx)
return acc
}, {})
}, [items])

return (
<div className="min-h-screen bg-[#0B0E11] text-[#EAECEF] pb-28">

  {/* HEADER */}
  <div className="sticky top-0 z-50 bg-[#1E2329]/90 backdrop-blur border-b border-[#2B3139] px-5 py-4">
    <h1 className="text-base font-semibold tracking-wide">
      Histórico de Transações
    </h1>
  </div>

  <div className="px-5 py-6 space-y-6">

    {Object.entries(grouped).length === 0 && (
      <div className="
        rounded-3xl
        p-6
        bg-[#1E2329]
        border border-[#2B3139]
        text-center text-[#848E9C] text-sm
      ">
        Nenhuma transação encontrada
      </div>
    )}

    {Object.entries(grouped).map(([date, txs]: any) => (
      <div key={date} className="space-y-3">

        <p className="text-[11px] text-[#6B7280] uppercase tracking-wider">
          {date}
        </p>

        {txs.map((tx: Transaction) => {
          const meta = TYPE_META[tx.type]
          const Icon = meta.icon

          return (
            <div
              key={tx.id}
              className="
                rounded-2xl
                p-4
                bg-gradient-to-br from-[#1E2329] to-[#14181D]
                border border-[#2B3139]
                flex items-center justify-between
                hover:border-[#3A424D]
                transition
              "
            >
              <div className="flex items-center gap-3">

                <div className={`
                  w-10 h-10 rounded-xl flex items-center justify-center
                  ${meta.bg}
                `}>
                  <Icon size={18} className={meta.color} />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    {meta.label}
                  </p>
                  <p className="text-[11px] text-[#848E9C]">
                    {new Date(tx.createdAt).toLocaleTimeString()}
                  </p>
                </div>

              </div>

              <p className={`text-sm font-semibold ${meta.color}`}>
                {meta.sign}{tx.amount.toLocaleString()} Kz
              </p>

            </div>
          )
        })}

      </div>
    ))}

  </div>

</div>

)
}