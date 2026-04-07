import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Megaphone } from 'lucide-react';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já viu o modal nesta sessão
    const hasSeenModal = sessionStorage.getItem('hasSeenWelcomeModal');
    
    if (!hasSeenModal) {
      // Pequeno delay para aparecer após o carregamento da página
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    sessionStorage.setItem('hasSeenWelcomeModal', 'true');
  };

  const joinGroup = () => {
    window.open("https://chat.whatsapp.com/Cf8sqTXqKVL1uAoH8J6D9i?mode=gi_t", "_blank");
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#1E2329] border border-[#2B3139] w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* Header com ícone */}
        <div className="bg-[#2F66EE] p-6 flex justify-center relative">
          <button 
            onClick={closeModal}
            className="absolute top-3 right-3 text-white/70 hover:text-white transition"
          >
            <X size={20} />
          </button>
          <div className="bg-white/20 p-4 rounded-full">
            <Megaphone size={40} className="text-white" />
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-6 text-center">
          <h3 className="text-xl font-bold text-white mb-2">
            Bem-vindo à Ford Motor!
          </h3>
          <p className="text-[#848E9C] text-sm mb-6">
            Junte-se à nossa comunidade oficial no WhatsApp para receber sinais, 
            novidades e suporte prioritário.
          </p>

          <div className="space-y-3">
            <button
              onClick={joinGroup}
              className="w-full py-3 bg-[#2F66EE] hover:bg-[#1a54db] text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg"
            >
              <MessageCircle size={20} />
              Entrar no Grupo Oficial
            </button>
            
            <button
              onClick={closeModal}
              className="w-full py-2 text-[#848E9C] text-sm hover:text-white transition"
            >
              Talvez mais tarde
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}