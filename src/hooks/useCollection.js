import {projectFirestore} from '../firebase/config'
import {  useEffect , useRef, useState } from 'react'


export const useCollection = (collection , _query , _orderBy)=>{
  const [documents , setDocuments] = useState(null)
  const [error , setError] = useState(null)

  const query= useRef(_query).current
  const orderBy = useRef(_orderBy).current

  useEffect(()=>{
    let ref = projectFirestore.collection(collection)

    if(query){
        ref = ref.where(...query)
    }

    if(orderBy){
        ref = ref.orderBy(...orderBy)
    }

    const unsub = ref.onSnapshot((snapshot)=>{
        let results = []
        snapshot.docs.forEach(doc => {
            results.push({...doc.data() , id : doc.id})
        })

        setDocuments(results)
        setError(null)
    } , (error)=> {
        console.log(error);
        setError('Could Not fetch data')
    })

    return ()=> unsub()

  } , [collection , query , orderBy])

  return {documents , error}
}