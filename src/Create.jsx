import React, { useState } from 'react'
import axios from 'axios'

function Create() {
  const [task,setTask]=useState()
  const handleAdd=()=>
    {
        axios.post('http://localhost:3001/add',{task:task})
        .then(result=>{
          location.reload() 

          console.log(result)})
        .catch(err=>{console.log(err)})
    }
  return (
    <>
    <div className='create_form input'>
      <input type="text" placeholder="Enter Task" onChange={(e)=>
        {
          setTask(e.target.value)
        }
      }></input>
    </div>
    <div className='create_form button'>
      <button type="button" onClick={handleAdd}>Add</button>
      

    </div>
    </>
  )
}

export default Create
