import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { Eye, EyeSlash } from '@phosphor-icons/react'
import AuthLayout from '../layouts/AuthLayout'
import { registerUser } from '../services/api'
import Toast from '../components/ui/Toast'

export default function Register() {

  const navigate = useNavigate()
  const [params] = useSearchParams()

  const referralCode = params.get('ref') || ''

  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [loading, setLoading] = useState(false)

  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'success' as 'success' | 'error'
  })

  useEffect(() => {
    if (!toast.visible) return
    const t = setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }))
    }, 2500)
    return () => clearTimeout(t)
  }, [toast.visible])

  function showError(message: string) {
    setToast({ visible: true, message, type: 'error' })
  }

  function showSuccess(message: string) {
    setToast({ visible: true, message, type: 'success' })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!referralCode) {
      showError('Acesso inválido: use um link de convite')
      return
    }

    if (!phone || !password || !confirmPassword) {
      showError('Preencha todos os campos')
      return
    }

    if (password.length < 6) {
      showError('Password mínimo 6 caracteres')
      return
    }

    if (password !== confirmPassword) {
      showError('Passwords não coincidem')
      return
    }

    try {
      setLoading(true)

      await registerUser(
  `+244${phone.replace(/\D/g, '')}`,
  password,
  referralCode
)

      showSuccess('Conta criada com sucesso')

      setTimeout(() => navigate('/login'), 1200)

    } catch (err: any) {
      showError(
        err?.response?.data?.message || 'Erro ao criar conta'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Criar conta"
      subtitle="Registo rápido via convite"
    >

      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(prev => ({ ...prev, visible: false }))}
      />

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* TELEFONE */}
        <div className="space-y-1">
          <label className="text-xs text-gray-400">Telefone</label>
          <div className="flex items-center bg-[#0b0e11] border border-[#1f2937] rounded-xl px-3">
            <span className="text-gray-400 text-sm mr-2">+244</span>
            <input
              type="tel"
              placeholder="912345678"
              className="bg-transparent w-full h-12 outline-none text-white"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div className="space-y-1">
          <label className="text-xs text-gray-400">Password</label>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full h-12 px-3 pr-12 rounded-xl bg-[#0b0e11] border border-[#1f2937] text-white"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="space-y-1">
          <label className="text-xs text-gray-400">Confirmar password</label>

          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className="w-full h-12 px-3 pr-12 rounded-xl bg-[#0b0e11] border border-[#1f2937] text-white"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showConfirmPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* BOTÃO */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full h-12 rounded-xl font-semibold text-black
            bg-gradient-to-r from-yellow-400 to-yellow-500
            active:scale-95 transition-all
            disabled:opacity-50
          "
        >
          {loading ? 'Criando conta...' : 'Criar conta'}
        </button>

        <div className="text-center text-sm text-gray-400">
          Já tens conta?{' '}
          <Link to="/login" className="text-yellow-400">
            Entrar
          </Link>
        </div>

      </form>

    </AuthLayout>
  )
}