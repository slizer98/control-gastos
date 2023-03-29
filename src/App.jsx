import { useState, useEffect ,useRef } from 'react'
import Swal from 'sweetalert2'
import Header from './components/Header'
import Filtros from './components/Filtros'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import { generarId } from './helpers'
import IconNuevoGasto from './img/nuevo-gasto.svg'

function App() {
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : [])
  const [presupuesto, setPresupuesto] = useState(localStorage.getItem('presupuesto') ?? '')
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      window.scrollTo(0, 0)
      setModal(!modal)
      document.body.classList.add('fijar')
      setTimeout(() => {
        setAnimarModal(!animarModal)
      }, 500);
    }
  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect(() => {
    if(filtro){
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
    if(presupuestoLS > 0){
      setPresupuesto(presupuestoLS)
      setIsValidPresupuesto(true)
    }
  }, [])
  
  const listaRef = useRef(null)

  const handleNuevoGasto = () => {
    window.scrollTo(0, 0)
    setModal(!modal)
    setGastoEditar({})
    document.body.classList.add('fijar')
    setTimeout(() => {
      setAnimarModal(!animarModal)
    }, 500);
  }

  const guardarGasto = gasto => {
    if((gasto.id)){
      // Actualizar gasto
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    } else {
      // Nuevo gasto
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }

    setAnimarModal(!animarModal)
    setTimeout(() => {
      setModal(!modal)
      if(listaRef.current){
        listaRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }
    }, 500);
  }
  if(!modal){
    document.body.classList.remove('fijar')
  }

  const eliminarGasto = id => { 
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Un gasto eliminado no se puede recuperar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const gastosFiltrados = gastos.filter(gasto => gasto.id !== id)
        setGastos(gastosFiltrados)
        Swal.fire(
          'Eliminado!',
          'El gasto ha sido eliminado.',
          'success'
        )
      }

    })

  }
  
  return (
    <div> 
      <Header 
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
        />
      {isValidPresupuesto && (
        <>
          <main ref={listaRef}>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos 
              gastos={gastos} 
              setGastoEditar={setGastoEditar} 
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
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
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
          />
        </div>
        )}
    </div>
  )
}

export default App
