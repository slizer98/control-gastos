import { useState ,useEffect } from "react"
import {CircularProgressbar, buildStyles} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import Swal from "sweetalert2"

const ControlPresupuesto = ({
  presupuesto, 
  gastos, 
  setGastos, 
  setPresupuesto,
  setIsValidPresupuesto
  }) => {

  const [porcentaje, setPorcentaje] = useState(0)
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)
  
  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)

    const totalDisponible = presupuesto - totalGastado
    const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)
    
    
    setDisponible(totalDisponible)
    setGastado(totalGastado)
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    }, 2500);
  }, [gastos])
  
  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString('en-US', 
    {style: 'currency', currency: 'USD'})
  }

  const handleResetApp = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, resetear',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setPresupuesto('')
        setGastos([])
        setIsValidPresupuesto(false)
      }
    })
  }
  
   return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        
        <CircularProgressbar
          value={porcentaje}
          background
          backgroundPadding={6}
          styles={buildStyles({
            backgroundColor: porcentaje > 100 ? "#dc2626" : "#85e6c0",
            textColor: porcentaje > 100 ? "#000" : "#fff",
            pathColor: "#fff",
            trailColor: "transparent",
            textSize: "0.95rem",
          })}
          text={`${porcentaje}% Gastado`}
        />
      </div>

      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Resetear App
        </button>
        <p>
            <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0  ? 'negativo' : ''}`}>
            <span>Disponible: </span>{formatearCantidad(disponible)}
        </p>
        <p>
            <span>Gastado: </span>{formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  )
}

export default ControlPresupuesto
