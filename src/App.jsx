import { useState,useEffect} from "react"
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPaciente from "./components/ListadoPaciente"

function App() {

  //Iniciando como arreglo vacio
  const [paciente,setPaciente] = useState([]);
  //Actualizar paciente
  const [pacientes,setPacientes] = useState({})

  //Use Efect
  useEffect(()=>{
    const pacientesLS = JSON.parse(localStorage.getItem('paciente')) ??[];
    setPaciente(pacientesLS)
  },[])

  useEffect(()=>{
    localStorage.setItem('paciente', JSON.stringify(paciente))
  },[paciente])


  const eliminarPaciente = id =>{
    // retorna un nuevo paciente
    const pacienteActualizados = paciente.filter(pacientes => pacientes.id !==id)
    setPaciente(pacienteActualizados)
  }

  return (
    <div className="container mx-auto mt-20">
      <Header/>

      <div className="mt-12 md:flex">
        <Formulario
        //Props
          paciente={paciente}
          setPaciente={setPaciente}
          pacientes={pacientes}
          setPacientes={setPacientes}
          
        />
        <ListadoPaciente
           paciente={paciente}
           setPacientes = {setPacientes}
           eliminarPaciente = {eliminarPaciente}
        
        />
      </div>
     
    </div>
  )
}

export default App
