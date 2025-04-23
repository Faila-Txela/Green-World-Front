// components/SettingsLayout.tsx
import { useState } from 'react';
import { FiSettings } from "react-icons/fi";
import GeralSection from '../../sectionsPersonal/GeralSection';
import SegurancaSection from '../../sectionsPersonal/SegurancaSections';
import NotificacoesSection from '../../sectionsEnterprise/Notifications';
import ExcluirConta from '../../sectionsEnterprise/ExcluirConta';

const SettingsLayout = () => {
  const [activeTab, setActiveTab] = useState('geral');

  const tabs = [
    { id: 'geral', label: 'Geral' },
    { id: 'seguranca', label: 'Segurança' },
    { id: 'notificacoes', label: 'Notificações' },
    { id: 'excluir', label: 'Excluir Conta' },
  ];

  return (
    <div className="mt-16">

      <div className='flex items-center gap-3 mb-6'>
      <FiSettings size={28} className="h-9 w-9 text-green-600 animate-pulse" />
      <h1 className="text-2xl md:text-3xl font-bold text-gray-700">Configurações da Empresa</h1>
      </div>

      {/* Tabs de navegação interna */}
      <div className="flex gap-4 border-b mb-6">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2 px-4 border-b-2 transition ${
              activeTab === tab.id
                ? 'border-green-600 text-green-600 font-semibold'
                : 'border-transparent text-gray-500 hover:text-green-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Conteúdo das seções */}
      <div className="mt-6">
        {activeTab === 'geral' && <GeralSection />}
        {activeTab === 'seguranca' && <SegurancaSection />}
        {activeTab === 'notificacoes' && <NotificacoesSection />}
        {activeTab === 'excluir' && <ExcluirConta />}
      </div>
    </div>
  );
};

export default SettingsLayout;