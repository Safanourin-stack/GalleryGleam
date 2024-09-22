import React,{createContext,useState} from 'react'


export const addrespcontext=createContext("")
export const favadd = createContext("")

function ContextShare({children}) 
{
  const [addresponse,setaddresponse]=useState("")
  
  return (
    <>
      <addrespcontext.Provider value={{addresponse,setaddresponse}}>
          <favadd.Provider>
              {children}
              </favadd.Provider>
      </addrespcontext.Provider>
    </>
  )
}

export default ContextShare
