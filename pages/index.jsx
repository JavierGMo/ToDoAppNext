import React, {useState} from 'react';

import Head from 'next/head'
import conectarDB from '../db/connection'
import Task from '../models/Task'


export default function Home({tasks}) {
  
  const estilosSimples = {
    separacion: {
      margin: {
        top: 20
      }
    }
  }

  const [tarea, setTarea] = useState("")

  const [tareas, setTareas] = useState(tasks)
  
  const handleChange = e => {
    const {value, name} = e.target;

    setTarea(value)
  }

  const onKeyDown = ({keyCode}) => {
    
    if(keyCode===13 && tarea!==''){
      
      createTask(tarea)
      setTarea("")
      
    }
  }

  const tareaEnProgeso = async (e, _id) => {
    e.preventDefault()
    try {
      const peticion = await fetch(`/api/task/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          status: 'progreso'
        })
      })
      if(peticion.status === 200) {getTasks()}
    } catch (error) {
      console.error(error);
    }

  }

  const tareaTerminada = async (e, _id) => {
    e.preventDefault()
    try {
      const peticion = await fetch(`/api/task/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          status: 'terminada'
        })
      })
      if(peticion.status === 200) {getTasks()}
    } catch (error) {
      console.error(error);
    }

  }

  const eliminarTarea = async (e, _id) => {
    e.preventDefault()
    try {
      const peticion = await fetch(`/api/task/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      })
      if(peticion.status === 200) {getTasks()}
    } catch (error) {
      console.error(error);
    }

  }

  const createTask = async (nuevaTarea) => {
    try {
      const res = await fetch('/api/task', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          title: nuevaTarea,
          status: 'pendiente'
        })
      })

      if(res.status === 200) getTasks()
    } catch (error) {
      console.error(error)
    }
  }

  const getTasks = async () => {
    try {
      const res = await fetch('/api/task', {
        headers: {
          'Content-type': 'application/json'
        }
      })
      if(res.status === 200){
        const data = await res.json()
        setTareas(()=>{
          return data.data
        });
      }

    } catch (error) {
      console.error(error)
    }
  }



  return (
    <div className="container">
      <Head>
        <title>Todo APP</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <div>
            <p>Presione enter para agregar la tarea</p>
            <h3>Tarea a agregar:</h3>

          </div>
          <div>
            <input
              name="tarea"
              type="text"
              placeholder="Tarea nueva"
              value={tarea}
              onChange={handleChange}
              onKeyDown={onKeyDown}
            />
          </div>
        </div>{/* nueva tarea */}
        <div className={estilosSimples.separacion}>
          {
            tareas.map(({_id, title, status})=>(
              <div key={_id}>
                <div>
                  <div>Titulo: {title}</div>
                  <div>Estado: {status}</div>
                </div>
                <div>
                  <button onClick={(e)=>tareaEnProgeso(e, _id)}>En progeso</button>
                  <button onClick={(e)=>tareaTerminada(e, _id)}>Terminada</button>
                  <button onClick={(e)=>eliminarTarea(e, _id)}>Eliminar</button>
                </div>
              </div>
            ))
          }
        </div>
      </main>

    </div>
  )
}


export async function getServerSideProps(){
  try {
    await conectarDB()
    const res = await Task.find({})
    const tasks = res.map(doc=>{
      const task = doc.toObject()
      task._id = `${task._id}`
      return task
    })
    return  {props: {tasks}}
  } catch (error) {
    console.error(error);
  }
}