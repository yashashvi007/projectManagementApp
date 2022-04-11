import { useEffect, useState } from "react"
import { projectAuth, projectFirestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"



export const useLogin = ()=>{
    const [isCancelled , setIsCancelled] = useState(false)

    const [error , setError] = useState(null)
    const [isPending , setIsPending] = useState(false)
    const {dispatch} = useAuthContext()

    const login =async (email , password)=>{
        setError(null)
        setIsPending(true)
        
        try {
        const res = await projectAuth.signInWithEmailAndPassword(email , password)

        await  projectFirestore.collection('users').doc(res.user.uid).update({ online : true })

         dispatch({type: 'LOGIN' , payload :res.user  })
         if(!isCancelled){
             setIsPending(false)
             setError(null)
         }
        } catch (err) {
            if(!isCancelled){
                console.log(err.message);
                setIsPending(false)
                setError(err.message)
            }
        }
    }

    useEffect(()=>{
        return ()=> setIsCancelled(true)
    } , [])

    return {error , isPending ,  login}
}

