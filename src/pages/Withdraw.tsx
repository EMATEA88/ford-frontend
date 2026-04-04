// src/pages/Withdraw.tsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, FileText } from 'lucide-react'
import { api } from '../services/api'
import { UserService } from '../services/user.service'

export default function Withdraw() {

const navigate = useNavigate()

const [amount, setAmount] = useState('')
const [balance, setBalance] = useState(0)
const [loading, setLoading] = useState(false)
const [message, setMessage] = useState<string | null>(null)

const FEE_PERCENT = 0.15

useEffect(() => {
UserService.me()
.then(res => setBalance(res.data.balance))
.catch(() => setBalance(0))
}, [])

const numericAmount = Number(amount)

const fee = Number((numericAmount * FEE_PERCENT).toFixed(2))
const netAmount = Number((numericAmount - fee).toFixed(2))

function handleError(error: any) {

  const errorCode = error?.response?.data?.error

  switch (errorCode) {

    case 'LIMIT_PER_TRANSACTION_EXCEEDED':
      return 'Valor excede o limite máximo por retirada.'

    case 'DAILY_LIMIT_EXCEEDED':
      return 'Limite diário atingido.'

    case 'MONTHLY_LIMIT_EXCEEDED':
      return 'Limite mensal atingido.'

    case 'INSUFFICIENT_BALANCE':
      return 'Saldo insuficiente.'

    case 'USER_BLOCKED':
      return 'Conta bloqueada. Contacte o suporte.'

    case 'DAILY_WITHDRAW_ALREADY_EXISTS':
      return 'Você já fez uma retirada hoje.'

    case 'WITHDRAW_PENDING_EXISTS':
      return 'Você já tem uma retirada em processamento.'

    case 'MIN_WITHDRAW_NOT_MET':
       return 'Valor mínimo de levantamento é 500 Kz.'

    case 'BANK_REQUIRED':
        return 'Você precisa vincular um banco antes de levantar.'

    case 'WITHDRAW_NOT_AVAILABLE_TODAY':
        return 'Levantamentos disponíveis apenas de segunda a sexta-feira.'

    case 'WITHDRAW_OUT_OF_HOURS':
        return 'Levantamentos disponíveis das 10h às 17:59.'

    default:
      return 'Erro ao solicitar retirada.'
  }
}

async function handleWithdraw() {

setMessage(null)

if (!numericAmount || numericAmount <= 0) {
  setMessage('Valor inválido')
  return
}

if (numericAmount > balance) {
  setMessage('Saldo insuficiente')
  return
}

try {

  setLoading(true)

  await api.post('/withdrawals', {
    amount: numericAmount,
  })

  setMessage('Pedido enviado com sucesso')
  setAmount('')

  const me = await UserService.me()
  setBalance(me.data.balance)

} catch (error: any) {

  setMessage(handleError(error))

} finally {
  setLoading(false)
}

}

const isValid =
numericAmount > 0 &&
numericAmount <= balance

return (
<div className="min-h-screen bg-[#0B0E11] text-[#EAECEF] pb-28">

  {/* HEADER */}
  <div className="sticky top-0 z-50 bg-[#1E2329]/90 backdrop-blur border-b border-[#2B3139] px-5 py-4 flex items-center justify-between">

    <div className="flex items-center gap-3">

      <button
        onClick={() => navigate(-1)}
        className="p-2 rounded-lg bg-[#2B3139] hover:bg-[#3A424D]"
      >
        <ArrowLeft size={16} />
      </button>

      <h1 className="text-sm font-semibold">
        Retirada
      </h1>

    </div>

    <button
      onClick={() => navigate('/withdraw-history')}
      className="p-2 rounded-lg bg-[#2B3139] hover:bg-[#3A424D]"
    >
      <FileText size={16} />
    </button>

  </div>

  <div className="px-5 py-6 space-y-5 max-w-xl mx-auto">

    {/* SALDO */}
    <div className="
      rounded-3xl p-6 text-center
      bg-gradient-to-br from-[#1E2329] to-[#14181D]
      border border-[#2B3139]
    ">
      <p className="text-xs text-[#848E9C]">
        Saldo disponível
      </p>

      <p className="text-3xl font-bold text-emerald-400 mt-2">
        {balance.toLocaleString()} Kz
      </p>
    </div>

    {/* FORM */}
    <div className="
      rounded-3xl p-6 space-y-5
      bg-[#1E2329]
      border border-[#2B3139]
    ">

      <div>
        <label className="text-xs text-[#848E9C]">
          Montante
        </label>

        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="
            w-full h-12 mt-2 px-4
            bg-[#0B0E11]
            border border-[#2B3139]
            rounded-xl text-[#EAECEF]
            focus:border-cyan-400 outline-none
          "
        />
      </div>

      {/* CALCULO */}
      {numericAmount > 0 && (
        <div className="
          bg-[#0B0E11]
          border border-[#2B3139]
          rounded-xl p-4 text-sm space-y-2
        ">

          <div className="flex justify-between text-[#848E9C]">
            <span>Taxa (15%)</span>
            <span className="text-red-400">
              -{fee.toFixed(2)} Kz
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#848E9C]">
              Valor líquido
            </span>
            <span className="font-semibold text-emerald-400">
              {netAmount.toFixed(2)} Kz
            </span>
          </div>

        </div>
      )}

      {/* BOTÃO */}
      <button
        onClick={handleWithdraw}
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
        {loading ? 'Processando…' : 'Confirmar retirada'}
      </button>

      {/* MENSAGEM */}
      {message && (
        <div className="
          text-center text-sm
          bg-[#0B0E11]
          border border-[#2B3139]
          rounded-xl py-3
          text-[#848E9C]
        ">
          {message}
        </div>
      )}

    </div>

  </div>

</div>

)
}