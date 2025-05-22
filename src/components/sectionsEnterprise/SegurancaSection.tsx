// sections/SegurancaSection.tsx
import { useState, useEffect } from 'react';
import axios from '../../lib/axios';
import Toast from '../ui/Toast';

const SegurancaSection = () => {
  const [toast, setToast] = useState<{ message: string; type: "error" | "success" } | null>(null);
  const [emailDB, setEmailDB] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const empresaId = localStorage.getItem('empresaId');
  
     useEffect(() => {
       axios.get(`/empresa/${empresaId}`).then((res) => {
         const user = res.data;
         setEmailDB(user.email || '');
       });
     }, []);

    const handleSave = async () => {
      try {
        await axios.put(`/empresa/${empresaId}`, {
          email: email || emailDB || 'Email da empresa',
        });
  
        setToast({ message: "Alterações salvas com sucesso!", type: "success" });
      } catch (err) {
        console.error("erro grave:",err);
        //alert('Erro ao salvar alterações');
        setToast({ message: "Erro ao salvar alterações", type: "error" });
      }
    }  

  return (
    <section className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold">Segurança</h2>

      <div className="space-y-2">
        <label className="block text-sm">Email da conta:</label>
        <input
          title="email"
          type="email"
          value={emailDB}
          readOnly
          className="w-full px-4 py-2 rounded-md border bg-gray-100 cursor-not-allowed"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm">Nova senha:</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="••••••••••••"
          className="w-full px-4 py-2 rounded-md border shadow-sm focus:ring-2 focus:ring-green-500"
        />

        <button
         className="mt-2 bg-green-600 text-black px-4 py-2 rounded-md hover:bg-green-700"
         type='button'
         onClick={handleSave}
         >
          Atualizar senha
        </button>

      </div>

      {/* Toast de feedback */}
      {toast && (
      <Toast
      message={toast.message}
      type={toast.type}
      onClose={() => setToast(null)}
      />
      )}

    </section>
  );
};

export default SegurancaSection;
