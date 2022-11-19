import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom"

function Messanger(props) {
    const location = useLocation();
    useEffect(()=>{
        setTimeout(()=>{
            console.log(location.state);
        },3000)
        
    },[location])
    
    

    // console.log(conversations);
    const [ loading, setLoading ] = useState(true);
    
    // useEffect(()=>{
    //     const checkDataPassed = setInterval(()=>{
    //         if(Object.keys(conversations).length!==0){
    //             clearInterval(checkDataPassed);
    //             setLoading(false);
    //         }
    //     },500);
    // },[conversations]); 

    
    
    return (
        <>
    {
        loading? <h1>로딩중</h1>
        :<div id='chatting'>

        </div>
    }
    </>
  )
  
}

export default Messanger