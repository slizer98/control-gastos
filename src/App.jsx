import { useState } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import IconNuevoGasto from './img/nuevo-gasto.svg'

function App() {
  const [presupuesto, setPresupuesto] = useState('')
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState([])

  const handleNuevoGasto = () => {
    setModal(!modal)

    setTimeout(() => {
      setAnimarModal(!animarModal)
    }, 500);
  }

  const guardarGasto = gasto => {
    setGastos([...gastos, gasto])
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
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
        />
      )}
    </>
  )
}

export default App
