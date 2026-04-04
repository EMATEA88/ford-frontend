import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { Landmark, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'

type BankForm = {
name: string
bank: string
iban: string
}

const CACHE_KEY = 'bank-cache'

export default function Bank() {

const navigate = useNavigate()

const cached = localStorage.getItem(CACHE_KEY)
const initial = cached
? JSON.parse(cached)
: { name: '', bank: '', iban: '' }

const [form, setForm] = useState<BankForm>(initial)
const [saving, setSaving] = useState(false)

useEffect(() => {
let mounted = true

api.get('/user-bank')
  .then(res => {
    if (!mounted || !res.data) return
    setForm(res.data)
    localStorage.setItem(CACHE_KEY, JSON.stringify(res.data))
  })
  .catch(() => {})

return () => { mounted = false }

}, [])

const isValid =
form.name.trim().length > 3 &&
form.bank.trim().length > 2 &&
form.iban.trim().length > 10

async function save() {
if (!isValid || saving) return

try {
  setSaving(true)

  await api.post('/user-bank', form)

  localStorage.setItem(CACHE_KEY, JSON.stringify(form))

  toast.success('Dados bancários salvos com sucesso')

  setTimeout(() => navigate('/profile'), 800)

} catch (err: any) {
  toast.error(
    err?.response?.data?.error ||
    'Erro ao salvar dados'
  )
} finally {
  setSaving(false)
}

}

return (
<div className="min-h-screen bg-[#0B0E11] text-[#EAECEF] pb-28">

  {/* HEADER PADRÃO */}
  <div className="sticky top-0 z-50 bg-[#1E2329]/90 backdrop-blur border-b border-[#2B3139] px-5 py-4 flex items-center gap-3">

    <button
      onClick={() => navigate(-1)}
      className="p-2 rounded-lg bg-[#2B3139] hover:bg-[#3A424D]"
    >
      <ArrowLeft size={16} />
    </button>

    <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center">
      <Landmark size={18} className="text-cyan-400" />
    </div>

    <h1 className="text-sm font-semibold tracking-wide">
      Dados Bancários
    </h1>

  </div>

  <div className="px-5 py-6 max-w-xl mx-auto">

    {/* CARD */}
    <div className="
      rounded-3xl
      p-6
      bg-gradient-to-br from-[#1E2329] to-[#14181D]
      border border-[#2B3139]
      space-y-5
    ">

      <Input
        label="Nome do titular"
        value={form.name}
        onChange={v => setForm({ ...form, name: v })}
      />

      <Input
        label="Banco"
        value={form.bank}
        onChange={v => setForm({ ...form, bank: v })}
      />

      <Input
        label="IBAN"
        value={form.iban}
        onChange={v => setForm({ ...form, iban: v })}
      />

      {/* BOTÃO */}
      <button
        onClick={save}
        disabled={!isValid || saving}
        className={`
          w-full h-12 rounded-xl font-semibold transition
          ${
            !isValid
              ? 'bg-[#2B3139] text-[#848E9C] cursor-not-allowed'
              : 'bg-cyan-500 text-black hover:brightness-110 active:scale-95'
          }
          ${saving ? 'opacity-60' : ''}
        `}
      >
        {saving ? 'A guardar…' : 'Salvar dados'}
      </button>

    </div>

  </div>

</div>

)
}

/* ================= INPUT ================= */

function Input({
label,
value,
onChange,
}: {
label: string
value: string
onChange: (v: string) => void
}) {
return (
<div className="space-y-2">

  <label className="text-[11px] text-[#848E9C] uppercase tracking-wide">
    {label}
  </label>

  <input
    value={value}
    onChange={e => onChange(e.target.value)}
    className="
      w-full h-11 rounded-xl
      bg-[#0B0E11]
      border border-[#2B3139]
      px-4 text-sm text-[#EAECEF]
      placeholder-[#6B7280]
      focus:border-cyan-400
      outline-none
      transition
    "
  />

</div>

)
}