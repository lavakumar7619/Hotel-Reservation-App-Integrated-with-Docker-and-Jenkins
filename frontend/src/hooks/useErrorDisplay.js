import React,{useState} from 'react'

const useErrorDisplay = () => {
    const [error, seterror] = useState("")
    const [open, setopen] = useState(false)
    const Handelalert=(message)=>{
        seterror(message)
        setopen(true)
    }
  return{
    Handelalert,seterror,open,setopen,error
  } ;
}

export default useErrorDisplay;