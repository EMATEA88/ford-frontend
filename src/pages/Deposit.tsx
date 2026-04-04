import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { RechargeService } from '../services/recharge.service'
import { UserService } from '../services/user.service'

/* ========================= */

const QUICK_AMOUNTS = [6000, 15000, 50000, 150000]
export default function Deposit() {
return <DepositAOA />
}

/* =========================
AOA (ÚNICO MÉTODO)
========================= */

function DepositAOA() {

const navigate = useNavigate()

const [amount, setAmount] = useState<number | ''>('')
const [balance, setBalance] = useState(0)
const [selected, setSelected] = useState<number | null>(null)
const [loading, setLoading] = useState(false)

useEffect(() => {
UserService.me()
.then(res => setBalance(res.data.balance))
.catch(() => setBalance(0))
}, [])

async function submit() {
if (!amount) return

try {
  setLoading(true)

  const res = await RechargeService.create(Number(amount))

  navigate(`/deposit/banks/${res.id}`)

} finally {
  setLoading(false)
}

}

const isValid = amount && Number(amount) > 0

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
      Depósito
    </h1>

  </div>

  <div className="px-5 py-6 space-y-5 max-w-xl mx-auto">

    {/* SALDO */}
    <div className="
      rounded-3xl p-6 text-center
      bg-gradient-to-br from-[#1E2329] to-[#14181D]
      border border-[#2B3139]
    ">
      <p className="text-xs text-[#848E9C]">
        Saldo atual
      </p>

      <p className="text-3xl font-bold text-emerald-400 mt-2">
        {balance.toLocaleString()} Kz
      </p>
    </div>

    {/* VALORES RÁPIDOS */}
    <div className="grid grid-cols-2 gap-3">
      {QUICK_AMOUNTS.map(v => (
        <button
          key={v}
          onClick={() => {
            setSelected(v)
            setAmount(v)
          }}
          className={`
            h-11 rounded-xl text-sm font-medium transition
            ${
              selected === v
                ? 'bg-cyan-500 text-black'
                : 'bg-[#1E2329] border border-[#2B3139]'
            }
          `}
        >
          {v.toLocaleString()}
        </button>
      ))}
    </div>

    {/* INPUT */}
    <div className="
      bg-[#1E2329]
      border border-[#2B3139]
      rounded-3xl p-5
    ">
      <label className="text-xs text-[#848E9C]">
        Montante
      </label>

      <input
        type="number"
        placeholder="0"
        value={amount}
        onChange={e => {
          setAmount(Number(e.target.value) || '')
          setSelected(null)
        }}
        className="
          w-full h-12 mt-2 px-4
          bg-[#0B0E11]
          border border-[#2B3139]
          rounded-xl text-[#EAECEF]
          focus:border-cyan-400 outline-none
        "
      />
    </div>

    {/* BOTÃO */}
    <button
      onClick={submit}
      disabled={!isValid || loading}
      className={`
        w-full h-12 rounded-xl font-semibold transition
        ${
          !isValid
            ? 'bg-[#2B3139] text-[#848E9C]'
            : 'bg-cyan-500 text-black hover:brightness-110 active:scale-95'
        }
        ${loading ? 'opacity-50' : ''}
      `}
    >
      {loading ? 'Processando…' : 'Confirmar depósito'}
    </button>

  </div>

</div>

)
}