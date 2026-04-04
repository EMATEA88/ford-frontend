import sede from '../assets/images/sede.jpg'
import tabela from '../assets/images/tabela.jpg'
import comissao from '../assets/images/comissao.jpg'

export default function About() {
  return (
    <div className="p-6 space-y-16 animate-fadeZoom">

      {/* HERO */}
      <section className="space-y-6 text-center">
        <h1 className="text-3xl font-semibold text-white">
          Ford Motor Company
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto">
          Uma das empresas automóveis mais influentes do mundo, reconhecida
          pela inovação industrial, produção em massa e evolução tecnológica
          no setor de mobilidade global.
        </p>

        <img
          src={sede}
          className="rounded-3xl shadow-xl w-full max-h-[400px] object-cover"
        />
      </section>


      {/* SOBRE */}
      <section className="space-y-4 max-w-3xl mx-auto text-center">
        <h2 className="text-xl font-semibold text-emerald-400">
          Sobre a empresa
        </h2>

        <p className="text-gray-400 leading-relaxed">
          Fundada em 1903 por Henry Ford, a empresa revolucionou a indústria
          automóvel com a introdução da produção em massa. Ao longo das décadas,
          expandiu-se globalmente e consolidou-se como referência em inovação,
          engenharia e acessibilidade no setor automóvel.
        </p>

        <p className="text-gray-400 leading-relaxed">
          Atualmente, a Ford atua em diversos segmentos, incluindo veículos
          comerciais, SUVs e soluções elétricas, mantendo forte presença
          internacional.
        </p>
      </section>


      {/* INVESTIMENTO */}
      <section className="space-y-6 max-w-4xl mx-auto">

        <h2 className="text-xl font-semibold text-emerald-400 text-center">
          Sistema de Investimento
        </h2>

        <p className="text-gray-400 leading-relaxed text-center">
          A Ford Motor Company disponibiliza um modelo estruturado de
          investimento baseado em produtos automóveis, permitindo aos
          participantes obter rendimentos diários de acordo com o plano
          adquirido.
        </p>

        <p className="text-gray-400 leading-relaxed text-center">
          Cada produto possui um valor de aquisição, rendimento definido e
          período de validade, conforme demonstrado na tabela abaixo.
        </p>

        {/* IMAGEM DEPOIS DO TEXTO */}
        <img
          src={tabela}
          className="rounded-2xl shadow-lg w-full"
        />
      </section>


      {/* COMISSÃO */}
      <section className="space-y-6 max-w-4xl mx-auto">

        <h2 className="text-xl font-semibold text-emerald-400 text-center">
          Sistema de Convites & Comissão
        </h2>

        <p className="text-gray-400 leading-relaxed text-center">
          A empresa também opera com um sistema de convites multinível,
          permitindo aos membros gerar comissões através da indicação de
          novos participantes.
        </p>

        <p className="text-gray-400 leading-relaxed text-center">
          As comissões são distribuídas por níveis (1 a 4), sendo aplicadas
          sobre o valor investido pelos convidados, desde que o utilizador
          possua um produto ativo no sistema.
        </p>

        <img
          src={comissao}
          className="rounded-2xl shadow-lg w-full"
        />
      </section>


      {/* MISSÃO + VISÃO + VALORES (UNIFICADO) */}
      <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">

        <h2 className="text-xl font-semibold text-emerald-400 text-center">
          Missão, Visão & Valores
        </h2>

        <div className="space-y-4 text-gray-400">

          <p>
            <span className="text-white font-medium">Missão:</span>{" "}
            Desenvolver soluções de mobilidade inovadoras, acessíveis e
            sustentáveis, promovendo eficiência e progresso tecnológico.
          </p>

          <p>
            <span className="text-white font-medium">Visão:</span>{" "}
            Liderar a transformação global da mobilidade, integrando tecnologia,
            inovação e sustentabilidade.
          </p>

          <div>
            <span className="text-white font-medium">Valores:</span>
            <ul className="mt-2 grid md:grid-cols-2 gap-2">
              <li>• Inovação contínua</li>
              <li>• Qualidade e excelência</li>
              <li>• Sustentabilidade</li>
              <li>• Integridade</li>
              <li>• Foco no cliente</li>
              <li>• Responsabilidade global</li>
            </ul>
          </div>

        </div>
      </section>

    </div>
  )
}