import { useState } from 'react';

const NotificacoesSection = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  return (
    <section className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold">Notificações</h2>

      <label className="flex items-center gap-3">
        <input type="checkbox" checked={emailNotif} onChange={() => setEmailNotif(!emailNotif)} />
        Receber notificações por e-mail
      </label>

      <label className="flex items-center gap-3">
        <input type="checkbox" checked={smsNotif} onChange={() => setSmsNotif(!smsNotif)} />
        Receber notificações por SMS
      </label>
    </section>
  );
};

export default NotificacoesSection;
