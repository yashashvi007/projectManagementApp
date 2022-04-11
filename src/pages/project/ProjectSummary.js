import React from 'react'
import Avatar from '../../components/Avatar'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import {useHistory} from 'react-router-dom'

export default function ProjectSummary({project}) {

    const {deleteDocument} = useFirestore('projects')

    const {user} = useAuthContext()
    const history = useHistory()

    const handleClick = (e)=>{
        deleteDocument(project.id)
        history.push('/')
    }

  return (
    <div className='project-summary' >
      <h2 className='page-title' >{project.name}</h2>
      <p>By {project.createdBy.displayName}</p>
      <p className='due-date' >  
        {project.dueDate.toDate().toDateString()}
      </p>
      <p className='details' >
        {project.details}
      </p>
      <h4>Project is assiged to :</h4>
      <div className='assigned-users' >
        {project.assignedUsersList.map(user => (
            <div key={user.photoURL} >
                <Avatar src={user.photoURL} />
            </div>
        ))}
      </div>
      {user.uid === project.createdBy.id && (
        <button className='btn' onClick={handleClick} >Mark as Complete</button>
      ) }
    </div>
  )
}
