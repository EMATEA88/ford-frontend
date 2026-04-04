import { useEffect, useState } from 'react'
import { GiftService } from '../services/gift.service'
import Toast from '../components/ui/Toast'
import { Gift, Ticket } from 'lucide-react'

export default function GiftPage() {

const [code, setCode] = useState('')
const [toastVisible, setToastVisible] = useState(false)
const [toastMessage, setToastMessage] = useState('')
const [toastType, setToastType] =
useState<'success' | 'error'>('error')
const [loading, setLoading] = useState(false)

const isCodeValid = code.trim().length > 0

async function redeem() {

if (!isCodeValid || loading) return

try {
  setLoading(true)

  const res = await GiftService.redeem(code.trim())

  setToastType('success')
  setToastMessage(`Crédito recebido: ${res.data.amount} Kz`)
  setToastVisible(true)
  setCode('')

} catch (e: any) {

  setToastType('error')
  setToastMessage(
    e.response?.data?.error || 'Código inválido ou expirado'
  )
  setToastVisible(true)

} finally {
  setLoading(false)
}

}

useEffect(() => {
if (!toastVisible) return
const t = setTimeout(() => setToastVisible(false), 2000)
return () => clearTimeout(t)
}, [toastVisible])

return (
<div className="min-h-screen bg-[#0B0E11] text-[#EAECEF]">

  <Toast
    visible={toastVisible}
    message={toastMessage}
    type={toastType}
  />

  {/* HEADER */}
  <div className="sticky top-0 z-50 bg-[#1E2329]/90 backdrop-blur border-b border-[#2B3139] px-5 py-4 flex items-center gap-3">

    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
      <Gift size={18} />
    </div>

    <h1 className="text-base font-semibold tracking-wide">
      Resgatar Código
    </h1>

  </div>

  <div className="px-5 py-6 max-w-xl mx-auto space-y-5">

    {/* CARD PRINCIPAL */}
    <div className="
      rounded-3xl
      p-5
      bg-gradient-to-br from-[#1E2329] to-[#14181D]
      border border-[#2B3139]
      space-y-5
    ">

      <div className="flex gap-3 items-start">

        <div className="w-9 h-9 rounded-xl bg-[#0B0E11] border border-[#2B3139] text-cyan-400 flex items-center justify-center">
          <Ticket size={16} />
        </div>

        <div>
          <p className="text-sm font-medium">
            Código promocional
          </p>
          <p className="text-[11px] text-[#848E9C] leading-relaxed">
            Introduza um código válido para adicionar saldo automaticamente à sua conta.
          </p>
        </div>

      </div>

      {/* INPUT */}
      <input
        value={code}
        onChange={e => setCode(e.target.value.toUpperCase())}
        className="
          w-full h-12 rounded-xl
          bg-[#0B0E11]
          border border-[#2B3139]
          px-4 text-sm text-[#EAECEF]
          placeholder-[#6B7280]
          focus:border-cyan-500
          focus:ring-1 focus:ring-cyan-500/30
          outline-none
          transition
        "
      />

      {/* BOTÃO */}
      <button
        onClick={redeem}
        disabled={!isCodeValid || loading}
        className={`
          w-full h-12 rounded-xl font-medium transition
          flex items-center justify-center gap-2
          ${
            !isCodeValid
              ? 'bg-[#2B3139] text-[#848E9C] cursor-not-allowed'
              : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-black hover:brightness-110 active:scale-95'
          }
          ${loading ? 'opacity-60' : ''}
        `}
      >
        {loading ? 'A processar...' : 'Resgatar código'}
      </button>

    </div>

    {/* INFO */}
    <div className="
      rounded-2xl
      p-4
      bg-[#1E2329]
      border border-[#2B3139]
      text-[#848E9C]
      text-xs leading-relaxed
    ">
      Os códigos promocionais são limitados e podem expirar.  
      Certifique-se de utilizar apenas códigos oficiais fornecidos pela plataforma.
    </div>

  </div>
</div>

)
}