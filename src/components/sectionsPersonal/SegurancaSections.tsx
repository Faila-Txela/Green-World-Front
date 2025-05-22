// sections/SegurancaSection.tsx
import { useState, useEffect } from 'react';
import axios from '../../lib/axios';
import Toast from '../ui/Toast';

const SegurancaSection = () => {
  const [toast, setToast] = useState<{message: string; type: "error" | "success"} | null>(null);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
    // Dados da base de dados
  const [emailDB, setEmailDB] = useState('');

    const userId = localStorage.getItem('userId');

      useEffect(() => {
        axios.get(`/users/${userId}`).then((res) => {
          const user = res.data;
          setEmailDB(user.emailDB || '')
        });
      }, []);

    const handleSave = async () => {
      try {
        if (!userId) {
          //alert('Usuário não identificado.');
          setToast({message: "Usuario não identificado", type: "error"});
          return;
        }

        await axios.put(`/users/${userId}`, {
          nome: email || emailDB,
        });

        //alert('Alterações salvas com sucesso!')
        setToast({message: "Alterações salvas com sucesso!", type: "success"});
      } catch (err) {
        console.error(err)
        //alert('Erro ao salvar alterações')
        setToast({message: "Erro ao salvar alterações", type: "error"});
      }
    };

  return (
    <section className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold">Segurança</h2>

      <div className="space-y-2">
        <label className="block text-sm">Email da conta:</label>
        <input
          type="email"
          placeholder={emailDB || "Email do usuário"}
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
          placeholder="••••••••••"
          className="w-full px-4 py-2 rounded-md border shadow-sm focus:ring-2 focus:ring-green-500"
        />

        <button
         type='button'
         onClick={handleSave}
         className="mt-2 bg-green-600 text-black px-4 py-2 rounded-md hover:bg-green-700">
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