import React, { useState } from 'react'
import ProjectList from '../../components/ProjectList'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import './Dashboard.css'
import ProjectFilter from './ProjectFilter'

export default function Dashboard() {

  const {documents , error} = useCollection('projects')
  const {user} = useAuthContext()
  const [currentFilter , setCurrentFilter] = useState('all')
  
  const changeFilter = (newFilter)=>{
    setCurrentFilter(newFilter)
  }

  const projects =documents ? documents.filter((document)=> {
    switch(currentFilter){
      case 'all':
        return true
      case 'mine':
        let assignedToMe = false
        document.assignedUsersList.forEach((u)=>{
           if(user.uid === u.id ){
             assignedToMe = true 
           }
        })
        return assignedToMe
      case 'development':
      case 'design':
      case 'sales':
      case 'marketing':
        console.log(document.category , currentFilter)
        return document.category === currentFilter
      default:
        return true

    }
  }) : null

  return (
    <div>
      <h2 className='page-title' >Dashboard</h2>
      {error && <p className='error' >{error}</p> }
      {documents && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} /> }
      {documents && <ProjectList projects={projects} /> }
    </div>
  )
}
