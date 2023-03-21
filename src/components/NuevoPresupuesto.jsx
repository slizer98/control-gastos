import Swal from "sweetalert2"

const NuevoPresupuesto = ({presupuesto, setPresupuesto}) => {
  const handlePresupuesto = (e) => {
    e.preventDefault()
    if (presupuesto < 1 || isNaN(presupuesto)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El presupuesto no es válido',
            confirmButtonColor: '#000'
        })
        return 
    }
  }
  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form onSubmit={handlePresupuesto} className="formulario">
        <div className="campo">
            <label htmlFor="">Definir Presupuesto</label>
            <input 
              type="text" 
              className="nuevo-presupuesto"
              placeholder="añade tu presupuesto"
              value={presupuesto}
              onChange={ e => setPresupuesto(e.target.value)}
            />
        </div>
        <input type="submit" value="Añadir" />
      </form>
    </div>
  )
}

export default NuevoPresupuesto
