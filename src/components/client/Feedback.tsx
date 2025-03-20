import image from '../../assets/growing.png'

function Feedback() {
  return (
    <div>

     <div className="h-screen flex justify-center items-center">
     <div className=''>
      <img className='h-64 w-64' src={image} alt="Imagem ilustrativa" />
    </div>
    <div className='flex flex-col justify-center items-center gap-3'>
      <h2 className=' font-semibold text-4xl'>Página de Feedback</h2>
      <div className='text-center flex flex-col gap-2'>
        <p>A página que está tentando acessar encontra-se em estado de desenvolvimento.</p>
        <p>Por favor, tente acessá-la mais tarde.</p>
      </div>
    </div>
     </div>

    </div>
  )
}

export default Feedback
