import {useState,useEffect} from 'react'
import Error from './Error';

//Use State cual es el estado de aplicacion tiene elemento o esta vacio
// una variable con informacion relevantes se peude compartir en varios
// Componentes el state es crado con la funcion useState
// ejemplo const [cliente,setCliente] = useState({}) llaves inicio vacio
//extraer cliente y set cliente de useState con valor inicial 0
// ({Variable vacia}) {[Arreglo vacio]}


//UsEEEFECT es un callback es bueno para consultar api o localstorage
//puede actualizar un componente cuando se le haga un click 

//añadir props paceinte y set paciente del APP.jsx
const Formulario = ({paciente,setPaciente,pacientes,setPacientes}) => {
    //State se ejecuta antes del componente
    //setNombre Modifica
    const [nombre,setNombre] = useState('');
    const [propietario,setPropietario] = useState('');
    const [email,setEmail] = useState('');
    const [fecha,setFecha] = useState('');
    const [sintomas,setSintomas] = useState('');

    //formar mensaje de error se manda false
    const [error,setError] = useState(false)

    //USE EFFECT

    useEffect(()=>{
      if(Object.keys(pacientes).length > 0){
        setNombre(pacientes.nombre)
        setPropietario(pacientes.propietario)
        setEmail(pacientes.email)
        setFecha(pacientes.fecha)
        setSintomas(pacientes.sintomas)

      }
    },[pacientes])

    const generarId = () =>{
      const random = Math.random().toString(36).substr(2)
      const fecha = Date.now().toString(36)
      return random +fecha ;
    }

    //Formulario Submit con Evento
    const handleSubmit = (e) =>{
      //Lo deja por default registrando el E(Evento)
      e.preventDefault()

      //Validar Formulario [Arreglo]
      if([nombre,propietario,email,fecha,sintomas].includes('')){
    

        //cambia a true
        setError(true)
        //Retorna a false
        return
      }
      //Cambiar de true a false
      setError(false)

      //objevtio de paciente

      const objetoPaciente = {
        nombre,
        propietario,
        email,
        fecha,
        sintomas,

      }

      if(pacientes.id){
          //Editando el registro
          objetoPaciente.id = pacientes.id

          const pacientesActualizados = paciente.map(pacienteState=> pacienteState.id === pacientes.id ? objetoPaciente : pacienteState)
          setPaciente(pacientesActualizados)
          setPacientes({})
      }else{
        //Generar ID antes de registrar
        objetoPaciente.id = generarId()
        //Nuevo REgistro
        setPaciente([...paciente, objetoPaciente]);
      }



  

      //reiniciar el formulario
      setNombre('')
      setPropietario('')
      setEmail('')
      setFecha('')
      setSintomas('')


    }
    







  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Paciente y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

    <form onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg py-10 px-5">

        {error &&  <Error>Todos los campos son obligatorio</Error>}


      <div className="mb-5">
        <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold"> Nombre Mascota</label>
          <input 
            id="mascota"
            type="text" 
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            //el evento se registra se va escribiendo con setNombre
            onChange={(e) => setNombre(e.target.value)}
          />
      </div>

      <div className="mb-5">
        <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold"> Nombre Propietario</label>
          <input 
            id="propietario"
            type="text" 
            placeholder="Nombre del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            //el evento se registra se va escribiendo con setNombre
            onChange={(e) => setPropietario(e.target.value)}
          />
      </div>

      <div className="mb-5">
        <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
          <input 
            id="email"
            type="email" 
            placeholder="Email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            //el evento se registra se va escribiendo con setNombre
            onChange={(e) => setEmail(e.target.value)}
          />
      </div>

      <div className="mb-5">
        <label htmlFor="fecha" className="block text-gray-700 uppercase font-bold">Fecha de Alta</label>
          <input 
            id="fecha"
            type="date" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            //el evento se registra se va escribiendo con setNombre
            onChange={(e) => setFecha(e.target.value)}
          />
      </div>

      <div className="mb-5">
        <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">sintomas</label>
         <textarea
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={sintomas}
            //el evento se registra se va escribiendo con setNombre
            onChange={(e) => setSintomas(e.target.value)}
          />
      </div>

      <input 
        type="submit" 
        value="Agregar Paciente"  
        className="bg-indigo-600 w-full p-3 text-white uppercase font-bold rounded-md hover:bg-indigo-700 cursor-pointer transition-all"
        value={pacientes.id ? 'Editar Paciente' : 'Agregar Paciente'}
      
      
      />

      

    </form>


    </div>
  )
}

export default Formulario