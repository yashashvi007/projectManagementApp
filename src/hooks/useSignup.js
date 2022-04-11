import {useEffect, useState} from 'react'
import { projectAuth , projectStorage , projectFirestore  } from '../firebase/config'
import { useAuthContext } from './useAuthContext'


export const useSignup = ()=>{
    const [isCancelled , setIsCancelled] = useState(false)
    const [error  , setError] = useState(null)
    const [isPending , setIspending] = useState(false)
    const {dispatch} = useAuthContext()

   
    
    const signup = async (email , password , displayName , thumbnail )=>{
      setError(null)
      setIspending(true)

      try {
        const res = await projectAuth.createUserWithEmailAndPassword(email , password)
        
        if(!res){
           throw new Error('Could not complete signup')
        }

        const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`

        const img = await projectStorage.ref(uploadPath).put(thumbnail)
        const imgUrl = await img.ref.getDownloadURL()


        await res.user.updateProfile({displayName  , photoURL :imgUrl })

        await projectFirestore.collection('users').doc(res.user.uid).set({
          online : true , 
          displayName , 
          photoURL : imgUrl
        })
       
        dispatch({type : 'LOGIN' , payload : res.user })
         
        if(!isCancelled){
          setIspending(false) 
          setError(null)
        }

      } catch (err) {
          
          if(!isCancelled){
            console.log(err.message);
            setIspending(false)
            setError(null)
          }
      }
    }

    useEffect(()=>{
      return ()=> setIsCancelled(true)
    } , [])

    return {error , isPending , signup}
}


