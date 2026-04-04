import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppService } from '../services/app.service'
import Toast from '../components/ui/Toast'
import { ArrowLeft, Copy } from 'lucide-react'

export default function ReferralPage() {

const navigate = useNavigate()

const [team, setTeam] = useState<any>({
members: [],
level1: 0,
level2: 0,
level3: 0,
link: ''
})

const [toast, setToast] = useState({
visible: false,
message: '',
type: 'success' as "success" | "error"
})

useEffect(() => {
load()
}, [])

async function load() {
const res = await AppService.getTeam()
setTeam(res.data.data)
}

async function copyLink() {
try {
await navigator.clipboard.writeText(team.link)

  setToast({
    visible: true,
    message: 'Link copiado com sucesso',
    type: 'success'
  })

} catch {
  setToast({
    visible: true,
    message: 'Erro ao copiar link',
    type: 'error'
  })
}

}

const members = team.members || []

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
      Equipa
    </h1>

  </div>

  <div className="px-5 py-6 space-y-5 max-w-xl mx-auto">

    {/* LINK */}
    <div className="
      rounded-3xl
      p-5
      bg-gradient-to-br from-[#1E2329] to-[#14181D]
      border border-[#2B3139]
    ">

      <p className="text-xs text-[#848E9C]">
        Meu link de convite
      </p>

      <div className="flex gap-2 mt-3">

        <input
          value={team.link || ''}
          readOnly
          className="
            flex-1 h-11 rounded-xl
            bg-[#0B0E11]
            border border-[#2B3139]
            px-3 text-xs text-[#EAECEF]
          "
        />

        <button
          onClick={copyLink}
          className="
            px-4 rounded-xl
            bg-cyan-500 text-black
            flex items-center gap-2
            hover:brightness-110 active:scale-95
          "
        >
          <Copy size={14} />
          Copiar
        </button>

      </div>

    </div>

    {/* NÍVEIS */}
    <div className="grid grid-cols-3 gap-3">

      <LevelCard label="Nível 1" value={team.level1} />
      <LevelCard label="Nível 2" value={team.level2} />
      <LevelCard label="Nível 3" value={team.level3} />

    </div>

    {/* MEMBROS */}
    <div className="
      rounded-3xl
      p-5
      bg-[#1E2329]
      border border-[#2B3139]
    ">

      <p className="text-sm text-[#848E9C] mb-4">
        Membros convidados
      </p>

      {members.length === 0 && (
        <p className="text-[#6B7280] text-sm">
          Nenhum membro ainda
        </p>
      )}

      <div className="space-y-3">

        {members.map((item: any) => (
          <div
            key={item.id}
            className="
              flex justify-between items-center
              p-3 rounded-xl
              bg-[#0B0E11]
              border border-[#2B3139]
            "
          >
            <div>
              <p className="text-sm">
                {item.invited.phone}
              </p>

              <p className="text-[11px] text-[#6B7280]">
                {new Date(item.invited.createdAt).toLocaleDateString()}
              </p>

              <p className="text-[11px] text-emerald-400">
                Gerou: {item.totalGenerated || 0} Kz
              </p>
            </div>

            <span className="
              text-[10px]
              bg-cyan-500/10 text-cyan-400
              px-3 py-1 rounded-full
            ">
              Nível {item.level}
            </span>
          </div>
        ))}

      </div>

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

/* COMPONENTE */

function LevelCard({
label,
value
}: {
label: string
value: number
}) {
return (
<div className="
rounded-2xl
p-4 text-center
bg-[#1E2329]
border border-[#2B3139]
">
<p className="text-[10px] text-[#848E9C]">
{label}
</p>
<p className="text-sm font-semibold mt-1">
{value}
</p>
</div>
)
}