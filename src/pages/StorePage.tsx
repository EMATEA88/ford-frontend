import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppService } from '../services/app.service'
import { ArrowLeft } from 'lucide-react'

export default function StorePage() {

const navigate = useNavigate()

const [items, setItems] = useState<any[]>([])

useEffect(() => {
load()
}, [])

async function load() {
const res = await AppService.getStore('all')
setItems(res.data.data)
}

function formatDate(date: string) {
return new Date(date).toLocaleDateString()
}

function getDurationDays(start: string, end: string) {
const s = new Date(start).getTime()
const e = new Date(end).getTime()
return Math.ceil((e - s) / (1000 * 60 * 60 * 24))
}

function getPercent(item: any) {
if (!item.amount) return 0
return ((Number(item.dailyRate) / Number(item.amount)) * 100).toFixed(2)
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

    <h1 className="text-sm font-semibold tracking-wide">
      Meus Produtos
    </h1>

  </div>

  <div className="px-5 py-6 space-y-5 max-w-xl mx-auto">

    {items.length === 0 && (
      <div className="
        rounded-3xl
        p-6
        bg-[#1E2329]
        border border-[#2B3139]
        text-center text-[#848E9C] text-sm
      ">
        Nenhum produto adquirido
      </div>
    )}

    {items.map((item) => {

      const isActive = item.status === 'active'
      const daily = Number(item.dailyRate)
      const duration = getDurationDays(item.startDate, item.endDate)
      const total = daily * duration

      return (
        <div
          key={item.id}
          className="
            rounded-3xl
            p-5
            bg-gradient-to-br from-[#1E2329] to-[#14181D]
            border border-[#2B3139]
            space-y-4
          "
        >

          {/* HEADER */}
          <div className="flex justify-between items-start">

            <div>
              <p className="text-sm font-semibold">
                {item.productName}
              </p>

              <p className="text-[11px] text-[#848E9C] mt-1">
                Expira em: {formatDate(item.endDate)}
              </p>
            </div>

            <div
              className={`text-[10px] px-3 py-1 rounded-full font-medium ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'bg-red-500/10 text-red-400'
              }`}
            >
              {isActive ? 'Ativo' : 'Expirado'}
            </div>

          </div>

          {/* GRID */}
          <div className="grid grid-cols-2 gap-3">

            <CardItem
              label="Investido"
              value={`${item.amount} Kz`}
            />

            <CardItem
              label="Rendimento diário"
              value={`${daily} Kz`}
              highlight="green"
            />

            <CardItem
              label="Ganho diário"
              value={`${getPercent(item)}%`}
              highlight="green"
            />

            <CardItem
              label="Total estimado"
              value={`${Math.floor(total)} Kz`}
              highlight="cyan"
            />

          </div>

          {/* FOOTER */}
          <div className="text-[11px] text-[#6B7280]">
            Duração: {duration} dias
          </div>

        </div>
      )
    })}

  </div>

</div>

)
}

/* COMPONENTE PADRÃO */

function CardItem({
label,
value,
highlight
}: {
label: string
value: string
highlight?: 'green' | 'cyan'
}) {

highlight === 'green'
? 'text-emerald-400'
: highlight === 'cyan'
? 'text-cyan-400'
: 'text-white'

return (
<div className="
rounded-xl
p-3
bg-[#0B0E11]
border border-[#2B3139]
">
<p className="text-[10px] text-[#848E9C]">
{label}
</p>
<p className={"text-sm font-semibold mt-1 ${color}"}>
{value}
</p>
</div>
)
}