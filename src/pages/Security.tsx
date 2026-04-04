import {
ArrowLeft,
ShieldCheck,
Lock,
Wifi,
Smartphone,
AlertTriangle
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Security() {

const navigate = useNavigate()

return (
<div className="min-h-screen bg-[#0B0E11] text-[#EAECEF]">

  {/* HEADER */}
  <div className="sticky top-0 z-50 bg-[#1E2329]/90 backdrop-blur border-b border-[#2B3139] px-5 py-4 flex items-center gap-3">

    <button
      onClick={() => navigate(-1)}
      className="p-2 rounded-xl bg-[#2B3139] hover:bg-[#3A424D] transition"
    >
      <ArrowLeft size={18} />
    </button>

    <h1 className="text-base font-semibold tracking-wide">
      Segurança da Conta
    </h1>

  </div>

  <div className="px-5 py-6 space-y-5 max-w-xl mx-auto">

    {/* STATUS */}
    <div className="
      rounded-3xl
      p-5
      bg-gradient-to-br from-[#1E2329] to-[#14181D]
      border border-[#2B3139]
    ">

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
          <ShieldCheck size={18} />
        </div>

        <div>
          <p className="text-sm font-medium">
            Proteção ativa
          </p>
          <p className="text-[11px] text-[#848E9C]">
            Sua conta está monitorada e protegida
          </p>
        </div>

      </div>

    </div>

    {/* BOAS PRÁTICAS */}
    <div className="
      rounded-3xl
      p-5
      bg-gradient-to-br from-[#1E2329] to-[#14181D]
      border border-[#2B3139]
      space-y-5
    ">

      <p className="text-xs text-[#848E9C] tracking-widest uppercase">
        Recomendações de segurança
      </p>

      <SecurityItem
        icon={<Lock size={16} />}
        title="Proteção de acesso"
        desc="Mantenha sua senha confidencial e evite reutilizar credenciais em outros serviços."
      />

      <SecurityItem
        icon={<ShieldCheck size={16} />}
        title="Transações seguras"
        desc="Utilize sempre autenticação adicional ao realizar levantamentos ou operações financeiras."
      />

      <SecurityItem
        icon={<Smartphone size={16} />}
        title="Dispositivo protegido"
        desc="Ative bloqueio de tela, biometria ou PIN para impedir acessos não autorizados."
      />

      <SecurityItem
        icon={<Wifi size={16} />}
        title="Ambiente de rede"
        desc="Evite redes públicas. Prefira conexões privadas e seguras ao aceder à plataforma."
      />

      <SecurityItem
        icon={<ShieldCheck size={16} />}
        title="Verificação de origem"
        desc="Confirme sempre que está a utilizar o site ou aplicação oficial antes de inserir dados."
      />

      <SecurityItem
        icon={<AlertTriangle size={16} />}
        title="Prevenção de fraude"
        desc="Nunca partilhe códigos, senhas ou informações sensíveis através de mensagens ou chamadas."
      />

    </div>

    {/* ALERTA */}
    <div className="
      rounded-2xl
      p-4
      bg-red-500/10
      border border-red-500/30
      text-red-400
    ">

      <div className="flex items-start gap-3">

        <AlertTriangle size={18} />

        <p className="text-xs leading-relaxed">
          Em caso de atividade suspeita, altere imediatamente a sua senha e entre em contacto com o suporte oficial.
        </p>

      </div>

    </div>

  </div>
</div>

)
}

/* ================= COMPONENT ================= */

function SecurityItem({
icon,
title,
desc
}: {
icon: React.ReactNode
title: string
desc: string
}) {
return (
<div className="flex gap-3">

  <div className="w-9 h-9 rounded-xl bg-[#0B0E11] border border-[#2B3139] text-cyan-400 flex items-center justify-center shrink-0">
    {icon}
  </div>

  <div>
    <p className="text-sm font-medium">
      {title}
    </p>
    <p className="text-[11px] text-[#848E9C] leading-relaxed">
      {desc}
    </p>
  </div>

</div>

)
}