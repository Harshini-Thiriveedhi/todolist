import React,{useState,useEffect} from 'react'
import {BsCircleFill,BsFillCheckCircleFill,BsTrashFill} from 'react-icons/bs';

import Create from './Create'
import './App.css'
import axios from 'axios'

function Home() {
    const [todos,setTodos]=useState([])
    useEffect(()=>
      {
        axios.get('http://localhost:3001/get')
        .then(result=>setTodos(result.data))
        .catch(err=>console.log(err))
      },[])
      const handleEdit=(id)=>
        {
          const id1=id
          axios.put(`http://localhost:3001/update/${id1}`)
          .then(result=>{
            location.reload()
          })
          .catch(err=>console.log(err))
        }
    
        const handleDelete=(id)=>
          {
            const id1=id
            axios.delete(`http://localhost:3001/delete/${id1}`)
            
          .then(result=>{
            location.reload()
            setTodos(prevTodos => prevTodos.filter(i => i._id !== id));
          })
          .catch(err=>console.log(err))
        
          }
  return (
    <>
    <div className='home'>
        <h2>Todo List</h2>
        <Create/>
        {
            todos.length===0?<div><h2>No Records</h2></div>:
            todos.map(todo=>(
              <div className='task'>
                 
                <div className='checkbox' onClick={()=>handleEdit(todo._id)
                  }>
                    {todo.done?
                      <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                        :<BsCircleFill className='icon'></BsCircleFill>
                    }
                
              
            
                <p className={todo.done?"line_through":""}>{todo.task}</p>
                  
                 

                </div>
                <div>
                   <span><BsTrashFill className='icon' onClick={()=>
                  {
                    handleDelete(todo._id)
                  }
                }></BsTrashFill></span>
                </div>
                 
                </div>
             
            ))
        }
      
    </div>
    </>
  )
}
export default Home