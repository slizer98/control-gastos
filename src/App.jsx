import { useState } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import IconNuevoGasto from './img/nuevo-gasto.svg'

function App() {
  const [presupuesto, setPresupuesto] = useState('')
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)

  const handleNuevoGasto = () => {
    setModal(!modal)
  }
  
  return (
    <>
      <Header 
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto && (
      <div className='nuevo-gasto'>
        <img 
          src={IconNuevoGasto} 
          alt="Icono nuevo gasto" 
          onClick={handleNuevoGasto}
          />
      </div>
      )}
      {modal && (
        <Modal 
          setModal={setModal}
        />
      )}
    </>
  )
}

export default App
