import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductService } from '../services/product.service'
import Toast from '../components/ui/Toast'
import { ArrowLeft } from 'lucide-react'

export default function ProductPage() {

const navigate = useNavigate()

const [products, setProducts] = useState<any[]>([])
const [loadingId, setLoadingId] = useState<number | null>(null)

const [toast, setToast] = useState({
visible: false,
message: '',
type: 'success' as "success" | "error"
})

useEffect(() => {
load()
}, [])

async function load() {
const res = await ProductService.list()

const sorted = res.data.data
  .map((p: any) => ({
    ...p,
    price: Number(p.price),
    dailyRate: Number(p.dailyRate)
  }))
  .sort((a: any, b: any) => a.price - b.price)

setProducts(sorted)

}

function getErrorMessage(error: string) {
switch (error) {
case 'INSUFFICIENT_BALANCE':
return 'Saldo insuficiente'
case 'PRODUCT_ALREADY_ACTIVE':
return 'Produto já ativo'
case 'LIMIT_REACHED':
return 'Limite atingido'
default:
return 'Erro ao investir'
}
}

async function handleBuy(productId: number) {
try {
setLoadingId(productId)

  await ProductService.purchase(productId)

  setToast({
    visible: true,
    message: 'Investimento realizado com sucesso',
    type: 'success'
  })

  load()

} catch (err: any) {

  const backendError = err.response?.data?.message

  setToast({
    visible: true,
    message: getErrorMessage(backendError),
    type: 'error'
  })

} finally {
  setLoadingId(null)
}

}

function getImage(name: string) {
const map: Record<string, string> = {
"Ford Fiesta": "/produtos/Ford-Fiesta.jpg",
"Ford Mustang GT": "/produtos/Ford-Mustang-GT.jpg",
"Ford F-150": "/produtos/Ford-150.jpg",
"Ford Explorer": "/produtos/Ford-Explorer.jpg",
"Ford GT": "/produtos/Ford-DT.jpg",
}

return map[name] || "/produtos/default.jpg"

}

function getDaily(product: any) {
return Math.floor(product.price * (product.dailyRate / 100))
}

function getTotal(product: any) {
return getDaily(product) * product.durationDays
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
      Investimentos
    </h1>

  </div>

  <div className="px-5 py-6 space-y-5 max-w-xl mx-auto">

    {products.length === 0 && (
      <div className="
        rounded-3xl p-6 text-center
        bg-[#1E2329] border border-[#2B3139]
        text-[#848E9C] text-sm
      ">
        Nenhum produto disponível
      </div>
    )}

    {products.map((p) => (
      <div
        key={p.id}
        className="
          rounded-3xl
          p-4
          bg-gradient-to-br from-[#1E2329] to-[#14181D]
          border border-[#2B3139]
          space-y-4
        "
      >

        {/* IMAGEM */}
        <img
          src={getImage(p.name)}
          alt={p.name}
          className="w-full h-45 object-cover rounded-xl"
        />

        {/* NOME */}
        <p className="text-sm font-semibold">
          {p.name}
        </p>

        {/* GRID */}
        <div className="grid grid-cols-2 gap-3">

          <Card label="Investimento" value={`${p.price} Kz`} />

          <Card
            label="Rendimento diário"
            value={`${getDaily(p)} Kz`}
            color="green"
          />

          <Card
            label="Ganho diário"
            value={`${p.dailyRate}%`}
            color="green"
          />

          <Card
            label="Total estimado"
            value={`${getTotal(p)} Kz`}
            color="cyan"
          />

        </div>

        {/* DURAÇÃO */}
        <p className="text-[11px] text-[#6B7280]">
          Duração: {p.durationDays} dias
        </p>

        {/* BOTÃO */}
        <button
          onClick={() => handleBuy(p.id)}
          disabled={loadingId === p.id}
          className="
            w-full h-12 rounded-xl font-semibold
            bg-cyan-500 text-black
            hover:brightness-110 active:scale-95
            transition disabled:opacity-50
          "
        >
          {loadingId === p.id ? 'Processando…' : 'Investir'}
        </button>

      </div>
    ))}

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

/* COMPONENTE */

function Card({
label,
value,
color
}: {
label: string
value: string
color?: 'green' | 'cyan'
}) {

color === 'green'
? 'text-emerald-400'
: color === 'cyan'
? 'text-cyan-400'
: 'text-white'

return (
<div className="
rounded-xl p-3
bg-[#0B0E11]
border border-[#2B3139]
">
<p className="text-[10px] text-[#848E9C]">
{label}
</p>
<p className={"text-sm font-semibold mt-1 ${textColor}"}>
{value}
</p>
</div>
)
}