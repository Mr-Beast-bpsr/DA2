import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'
import { Spinner } from 'react-bootstrap';

const MyVerticallyCenteredModal = (props) => {
  const newUrl = "https://rinkeby.etherscan.io/tx/" + props.value;
  // console.log(props)
  return (

      <Modal style={{color:"white",  }}
        {...props}
        size="lg"
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header   >
          <Modal.Title id="contained-modal-title-vcenter">
            Transaction Window
          </Modal.Title>
          
        </Modal.Header>
        <Modal.Body   className= "container itmes-center text-center">
        {props.value !== null ?  <h4>Transaction Hash: </h4>: <h3>Waiting for confirmation</h3>}
          <div className="text-break">
          {props.value !== null ?<>
           {props.value }
           <br/>
           {props.success?
           <a href={newUrl} target="_blank" rel="noopener noreferrer">View on Snowtrace</a>
          :''}
          </>
            :<Spinner  size="lg" animation="border" />}
          
          </div>
        </Modal.Body>
   
      </Modal>
    );
  }
  

export default MyVerticallyCenteredModal