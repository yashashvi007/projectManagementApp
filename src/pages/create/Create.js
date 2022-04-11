import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { timestamp } from '../../firebase/config'
import { useCollection } from '../../hooks/useCollection'
import {useAuthContext} from '../../hooks/useAuthContext'
import './Create.css'
import { useFirestore } from '../../hooks/useFirestore'
import {useHistory} from 'react-router-dom'

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]


export default function Create() {
  const history = useHistory()
  const {addDocument , response} = useFirestore('projects')
  const [name , setName] = useState('')
  const [details , setDetails] = useState('')
  const [dueDate , setDueDate] = useState('')
  const [category , setCategory] = useState('')
  const [assignedUsers , setAssignedUsers] = useState([])
  const [formError , setFormError] = useState(null)
  const {user} = useAuthContext()

  const {documents}  = useCollection('users')
  const [users , setUsers] = useState([])

  useEffect(()=>{
    if(documents){
      const options = documents.map(user => {
        return {
          value : user , 
          label : user.displayName 
        }
      })
      setUsers(options)
    }
  } , [documents])

  const handleSubmit =async (e)=>{
    e.preventDefault()
    setFormError(null)
    
    if(!category){
      setFormError('Please select a project category')
      return 
    }

    if(assignedUsers.length < 1 ){
      setFormError('Please assign project to atleast 1 user')
      return 
    }
    
    const createdBy = {
      displayName : user.displayName , 
      photoURL : user.photoURL , 
      id : user.uid
    }

    const assignedUsersList = assignedUsers.map((u)=> {
      return {
        displayName : u.value.displayName , 
        photoURL : u.value.photoURL , 
        id : u.value.id
      }
    })

    const project = {
      name  , 
      details , 
      category : category.value , 
      dueDate : timestamp.fromDate(new Date(dueDate)) , 
      comments : [] , 
      createdBy , 
      assignedUsersList
    }
    
    await addDocument(project)
    if(!response.error){
      history.push('/')
    }
  }

  return (
    <div className='create-form' > 
      <h2 className='page-title' >Create a new project</h2>
      <form onSubmit={handleSubmit} >
        <label>
          <span>Project Name : </span>
          <input
            required
            type='text'
            onChange  = {(e)=> setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project details : </span>
          <textarea
            required
            type='text'
            onChange  = {(e)=> setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Set due date : </span>
          <input
            required
            type='date'
            onChange  = {(e)=> setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select 
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select 
             onChange={(option)=> setAssignedUsers(option)}
             options={users}
             isMulti
          />
        </label>
        <button className='btn' >Add Project</button>

        {formError && <p className='error' >{formError}</p> }
      </form>
    </div>
  )
}
