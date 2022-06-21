import React from 'react'
import {Placeholder} from 'react-bootstrap'
const LoadingPlaceHolder = () => {
  return (
      
    <div

    style={{ marginTop: "8rem" }}
    className="right-part col-md-6"
  >
    <Placeholder bg="dark" as="p" animation="glow">
      <Placeholder bg="dark" xs={5} />
    </Placeholder>
    <Placeholder bg="dark" as="p" animation="wave">
      <Placeholder bg="dark" xs={5} />
    </Placeholder>
    <Placeholder bg="dark" as="p" animation="glow">
      <Placeholder bg="dark" xs={5} />
    </Placeholder>
    <Placeholder bg="dark" as="p" animation="wave">
      <Placeholder bg="dark" xs={5} />
    </Placeholder>
  </div>
  )
}

export default LoadingPlaceHolder