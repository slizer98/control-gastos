import Swal from "sweetalert2"

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {
  const handlePresupuesto = (e) => {
    e.preventDefault()
    if (presupuesto < 1 || !presupuesto) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El presupuesto no es válido',
            confirmButtonColor: '#000'
        })
        return 
    }
    setIsValidPresupuesto(true)
  }
  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form onSubmit={handlePresupuesto} className="formulario">
        <div className="campo">
            <label htmlFor="">Definir Presupuesto</label>
            <input 
              type="number" 
              className="nuevo-presupuesto"
              placeholder="añade tu presupuesto"
              value={presupuesto}
              onChange={ e => setPresupuesto(Number(e.target.value))}
            />
        </div>
        <input type="submit" value="Añadir" />
      </form>
    </div>
  )
}

export default NuevoPresupuesto
