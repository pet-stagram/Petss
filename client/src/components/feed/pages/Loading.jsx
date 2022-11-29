import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner  } from "@fortawesome/free-solid-svg-icons";

const Loading = () => {
  return (
    <div style={{position:"relative", top:"500px", left:"50%"}}>
        <FontAwesomeIcon icon={faSpinner} pulse size="4x" />
    </div>
  )
}

export default Loading