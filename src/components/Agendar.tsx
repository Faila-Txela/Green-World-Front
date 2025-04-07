import { MdOutlineCalendarMonth } from "react-icons/md"

function Agendar() {
  return (
    <div className="flex items-center h-screen">
    {/* Texto explicativo da tela */}
    <div className="flex items-center p-4 gap-3 absolute top-20 left-72">
      <MdOutlineCalendarMonth className="h-9 w-9" />
      <h1 className="text-xl md:text-2xl font-semibold text-left">Painel Principal de Actividades Agendadas</h1>
    </div>

    <div className="mb-96">
    <p>Agende suas actividades ecológicas na Green World.</p>
    </div>
    </div>
  )
}

export default Agendar