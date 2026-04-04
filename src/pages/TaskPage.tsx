import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppService } from '../services/app.service'
import Toast from '../components/ui/Toast'

import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from 'recharts'

import { ArrowLeft, CheckCircle } from 'lucide-react'

export default function TaskPage() {

const navigate = useNavigate()

const [status, setStatus] = useState<any>({})
const [history, setHistory] = useState<any[]>([])
const [earnings, setEarnings] = useState<any>({})
const [loading, setLoading] = useState(false)

const [toast, setToast] = useState({
visible: false,
message: '',
type: 'success' as "success" | "error"
})

useEffect(() => {
load()
}, [])

async function load() {
const [s, h, e] = await Promise.all([
AppService.getTaskStatus(),
AppService.getTaskHistory(),
AppService.getEarnings()
])

setStatus(s.data.data)
setHistory(h.data.data)
setEarnings(e.data.data)

}

async function handleTask() {
try {
setLoading(true)

  const res = await AppService.completeTask()

  setToast({
    visible: true,
    message: `+${res.data.data.reward} Kz ganho`,
    type: 'success'
  })

  load()

} catch (err: any) {
  setToast({
    visible: true,
    message: err.response?.data?.message || 'Erro ao executar tarefa',
    type: 'error'
  })
} finally {
  setLoading(false)
}

}

const chartData = history
.map((i: any) => ({
date: new Date(i.date).toLocaleDateString(),
reward: Number(i.reward)
}))
.slice(-7)

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

    <h1 className="text-sm font-semibold tracking-wide">
      Tarefas Diárias
    </h1>

  </div>

  <div className="px-5 py-6 space-y-5 max-w-xl mx-auto">

    {/* GANHOS */}
    <div className="
      rounded-3xl
      p-6
      bg-gradient-to-br from-[#1E2329] to-[#14181D]
      border border-[#2B3139]
    ">

      <p className="text-xs text-[#848E9C] uppercase">
        Ganhos hoje
      </p>

      <h1 className="text-3xl font-bold text-emerald-400 mt-1">
        {earnings.todayEarnings || 0} Kz
      </h1>

      <div className="mt-4 pt-4 border-t border-[#2B3139]">

        <p className="text-xs text-[#848E9C]">
          Total acumulado
        </p>

        <p className="text-lg font-semibold">
          {earnings.totalEarnings || 0} Kz
        </p>

      </div>

    </div>

    {/* BOTÃO / STATUS */}
    {!status.completed ? (
      <button
        onClick={handleTask}
        disabled={loading}
        className="
          w-full h-12 rounded-xl font-semibold
          bg-cyan-500 text-black
          hover:brightness-110 active:scale-95
          transition
          disabled:opacity-50
        "
      >
        {loading ? 'Processando…' : 'Executar tarefa'}
      </button>
    ) : (
      <div className="
        flex items-center justify-center gap-2
        rounded-xl p-3
        bg-emerald-500/10 border border-emerald-500/30
        text-emerald-400 text-sm font-medium
      ">
        <CheckCircle size={16} />
        Tarefa concluída hoje
      </div>
    )}

    {/* COMISSÕES */}
    <div className="grid grid-cols-2 gap-4">

      <div className="
        rounded-2xl p-4
        bg-[#1E2329]
        border border-[#2B3139]
      ">
        <p className="text-[11px] text-[#848E9C]">
          Comissão total
        </p>
        <p className="text-sm font-semibold">
          {earnings.totalCommission || 0} Kz
        </p>
      </div>

      <div className="
        rounded-2xl p-4
        bg-[#1E2329]
        border border-[#2B3139]
      ">
        <p className="text-[11px] text-[#848E9C]">
          Comissão hoje
        </p>
        <p className="text-sm font-semibold">
          {earnings.todayCommission || 0} Kz
        </p>
      </div>

    </div>

    {/* GRÁFICO */}
    <div className="
      rounded-3xl p-5
      bg-[#1E2329]
      border border-[#2B3139]
    ">

      <p className="text-xs text-[#848E9C] mb-4">
        Últimos 7 dias
      </p>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="reward"
            stroke="#06B6D4"
            strokeWidth={3}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>

  </div>

  <Toast
    visible={toast.visible}
    message={toast.message}
    type={toast.type}
    onClose={() => setToast({ ...toast, visible: false })}
  />

</div>

)
}