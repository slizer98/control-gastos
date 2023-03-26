import { useState, useRef } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import { generarId } from './helpers'
import IconNuevoGasto from './img/nuevo-gasto.svg'

function App() {
  const [presupuesto, setPresupuesto] = useState('')
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState([])
  const listaRef = useRef(null)

  const handleNuevoGasto = () => {
    window.scrollTo(0, 0)
    setModal(!modal)
    document.body.classList.add('fijar')
    setTimeout(() => {
      setAnimarModal(!animarModal)
    }, 500);
  }

  const guardarGasto = gasto => {
    gasto.id = generarId()
    gasto.fecha = Date.now()
    setGastos([...gastos, gasto])

    setAnimarModal(!animarModal)
    setTimeout(() => {
      setModal(!modal)
      // document.body.classList.remove('fijar')
      if(listaRef.current){
        listaRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }
    }, 500);
  }
  if(!modal){
    document.body.classList.remove('fijar')
  }
  
  return (
    <div> 
      <Header 
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        />
      {isValidPresupuesto && (
        <>
          <main ref={listaRef}>
            <ListadoGastos gastos={gastos} />
          </main>
          <div className='nuevo-gasto'>
            <img 
              src={IconNuevoGasto} 
              alt="Icono nuevo gasto" 
              onClick={handleNuevoGasto}
              />
          </div>
        </>
      )}
      {modal && (
        <div className="modal fijar">
          <Modal 
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          />
        </div>
        )}
    </div>
  )
}

export default App
