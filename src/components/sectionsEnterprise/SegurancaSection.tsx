// sections/SegurancaSection.tsx
import { useState } from 'react';

const SegurancaSection = () => {
  const [email, setEmail] = useState('albertinasauimbo17@gmail.com');
  const [senha, setSenha] = useState('');

  return (
    <section className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold">Segurança</h2>

      <div className="space-y-2">
        <label className="block text-sm">Email da conta:</label>
        <input
          title='email'
          type="email"
          value={email}
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
        <button className="mt-2 bg-green-600 text-black px-4 py-2 rounded-md hover:bg-green-700">
          Atualizar senha
        </button>
      </div>
    </section>
  );
};

export default SegurancaSection;
