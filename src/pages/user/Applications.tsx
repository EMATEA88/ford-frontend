import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { ApplicationService } from '../../services/application.service'

interface Application {
  id: number
  amount: string
  interestRate: string
  periodDays: number
  totalReturn: string
  status: string
  maturityDate: string
}

export default function Applications() {

  const [items, setItems] = useState<Application[]>([])
  const [amount, setAmount] = useState('')
  const [periodDays, setPeriodDays] = useState(15)
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    try {
      setLoading(true)
      const data = await ApplicationService.list()
      setItems(data)
    } catch {
      toast.error('Erro ao carregar investimentos')
    } finally {
      setLoading(false)
    }
  }

  function calculatePreview() {
  const value = Number(amount)
  if (!value) return 0

  const rates: Record<number, number> = {
    15: 5,
    90: 7,
    180: 10,
    365: 20,
    730: 40,
  }

  const rate = rates[periodDays] || 0

  return value + (value * rate / 100)
}

  async function create() {
    if (!amount || Number(amount) <= 0) {
      toast.error('Valor inválido')
      return
    }

    try {
      setCreating(true)
      await ApplicationService.create(Number(amount), periodDays)
      toast.success('Investimento criado')
      setAmount('')
      await load()
    } catch (err: any) {
      toast.error(err?.response?.data?.error || 'Erro ao investir')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0E11] text-[#EAECEF] px-5 pt-6 pb-28 space-y-6">

      {/* HEADER */}
      <h1 className="text-lg font-semibold">
        Aplicações
      </h1>

      {/* CARD CRIAÇÃO */}
      <div className="bg-[#1E2329] border border-[#2B3139] rounded-3xl p-6 space-y-5">

        {/* PRAZO */}
        <div>
          <label className="text-xs text-[#848E9C]">
            Prazo
          </label>

          <select
            value={periodDays}
            onChange={e => setPeriodDays(Number(e.target.value))}
            className="
              mt-2 w-full h-12 px-4 rounded-xl
              bg-[#0B0E11]
              border border-[#2B3139]
              text-sm text-[#EAECEF]
              outline-none
            "
          >
            <option value={15}>15 dias (5%)</option>
            <option value={90}>3 meses (7%)</option>
            <option value={180}>6 meses (10%)</option>
            <option value={365}>12 meses (20%)</option>
            <option value={730}>24 meses (40%)</option>
          </select>
        </div>

        {/* VALOR */}
        <div>
          <label className="text-xs text-[#848E9C]">
            Valor (Kz)
          </label>

          <input
            type="number"
            placeholder="Digite o valor"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="
              mt-2 w-full h-12 px-4 rounded-xl
              bg-[#0B0E11]
              border border-[#2B3139]
              text-sm text-[#EAECEF]
              placeholder-[#848E9C]
              outline-none
            "
          />
        </div>

        {/* PREVIEW */}
        {amount && (
          <div className="
            bg-[#0B0E11]
            border border-[#2B3139]
            rounded-xl p-4
          ">
            <p className="text-xs text-[#848E9C]">
              Retorno estimado
            </p>

            <p className="text-lg font-semibold text-emerald-400">
              {calculatePreview().toLocaleString()} Kz
            </p>
          </div>
        )}

        {/* BOTÃO */}
        <button
          disabled={creating}
          onClick={create}
          className="
            w-full h-12 rounded-xl font-semibold
            bg-[#2B3139]
            text-[#EAECEF]
            border border-[#3A424D]
            hover:bg-[#3A424D]
            transition
            disabled:opacity-50
          "
        >
          {creating ? 'A processar...' : 'Criar aplicação'}
        </button>

      </div>

      {/* LISTA */}
      <div className="space-y-4">

        {loading && (
          <div className="text-center text-[#848E9C]">
            Carregando...
          </div>
        )}

        {!loading && items.length === 0 && (
          <div className="
            bg-[#1E2329]
            border border-[#2B3139]
            rounded-3xl p-6 text-center
            text-[#848E9C]
          ">
            Nenhuma aplicação encontrada
          </div>
        )}

        {items.map(app => (
          <div
            key={app.id}
            className="
              bg-[#1E2329]
              border border-[#2B3139]
              rounded-3xl p-5 space-y-3
            "
          >

            <Row label="Valor" value={`${Number(app.amount).toLocaleString()} Kz`} />

            <Row
              label="Retorno"
              value={`${Number(app.totalReturn).toLocaleString()} Kz`}
              highlight
            />

            <Row label="Prazo" value={`${app.periodDays} dias`} />

            <Row
              label="Vencimento"
              value={new Date(app.maturityDate).toLocaleDateString('pt-AO')}
            />

            <Row
              label="Status"
              value={app.status}
              status
            />

          </div>
        ))}

      </div>

    </div>
  )
}

/* COMPONENTES */

function Row({ label, value, highlight, status }: any) {

  function getStatusColor() {
    if (value === 'ACTIVE') return 'text-emerald-400'
    if (value === 'COMPLETED') return 'text-[#848E9C]'
    if (value === 'CANCELLED') return 'text-red-400'
    return 'text-[#EAECEF]'
  }

  return (
    <div className="flex justify-between text-sm">

      <span className="text-[#848E9C]">
        {label}
      </span>

      <span className={`
        font-medium
        ${highlight ? 'text-emerald-400' : ''}
        ${status ? getStatusColor() : ''}
      `}>
        {value}
      </span>

    </div>
  )
}